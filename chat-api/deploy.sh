#!/usr/bin/env bash
# Deploy the "ask my portfolio" LLM backend to AWS Lambda (Function URL).
# Idempotent: safe to re-run to update code or rotate the key.
#
# Prereqs: AWS CLI v2 configured (`aws configure`), and your OpenAI key exported:
#   export OPENAI_API_KEY=sk-...
#   ./deploy.sh
#
# Optional overrides:
#   FUNCTION_NAME (default ask-portfolio) · REGION (default your CLI default) · OPENAI_MODEL (default gpt-4o-mini)
set -euo pipefail

FUNCTION_NAME="${FUNCTION_NAME:-ask-portfolio}"
ROLE_NAME="${ROLE_NAME:-${FUNCTION_NAME}-role}"
OPENAI_MODEL="${OPENAI_MODEL:-gpt-4o-mini}"
ALLOWED_ORIGIN="${ALLOWED_ORIGIN:-*}"
REGION_ARG=""
[ -n "${REGION:-}" ] && REGION_ARG="--region ${REGION}"

if [ -z "${OPENAI_API_KEY:-}" ]; then
  echo "ERROR: export OPENAI_API_KEY=sk-... before running." >&2
  exit 1
fi

cd "$(dirname "$0")"
ACCOUNT_ID="$(aws sts get-caller-identity --query Account --output text)"
ROLE_ARN="arn:aws:iam::${ACCOUNT_ID}:role/${ROLE_NAME}"

echo "==> 1/5  IAM execution role"
if ! aws iam get-role --role-name "$ROLE_NAME" >/dev/null 2>&1; then
  aws iam create-role --role-name "$ROLE_NAME" \
    --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"lambda.amazonaws.com"},"Action":"sts:AssumeRole"}]}' >/dev/null
  aws iam attach-role-policy --role-name "$ROLE_NAME" \
    --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
  echo "    created $ROLE_NAME — waiting 10s for propagation"
  sleep 10
else
  echo "    role exists"
fi

echo "==> 2/5  package handler"
rm -f function.zip && zip -q function.zip handler.mjs

echo "==> 3/5  create or update function"
if aws lambda get-function --function-name "$FUNCTION_NAME" $REGION_ARG >/dev/null 2>&1; then
  aws lambda update-function-code --function-name "$FUNCTION_NAME" --zip-file fileb://function.zip $REGION_ARG >/dev/null
  aws lambda wait function-updated --function-name "$FUNCTION_NAME" $REGION_ARG
else
  aws lambda create-function --function-name "$FUNCTION_NAME" \
    --runtime nodejs20.x --handler handler.handler --timeout 20 --memory-size 256 \
    --role "$ROLE_ARN" --zip-file fileb://function.zip $REGION_ARG >/dev/null
  aws lambda wait function-active --function-name "$FUNCTION_NAME" $REGION_ARG
fi

echo "==> 4/5  set env vars (key + model + origin)"
aws lambda update-function-configuration --function-name "$FUNCTION_NAME" \
  --environment "Variables={OPENAI_API_KEY=${OPENAI_API_KEY},OPENAI_MODEL=${OPENAI_MODEL},ALLOWED_ORIGIN=${ALLOWED_ORIGIN}}" $REGION_ARG >/dev/null
aws lambda wait function-updated --function-name "$FUNCTION_NAME" $REGION_ARG

echo "==> 5/5  public Function URL + CORS"
aws lambda add-permission --function-name "$FUNCTION_NAME" \
  --statement-id FunctionURLAllowPublicAccess --action lambda:InvokeFunctionUrl \
  --principal '*' --function-url-auth-type NONE $REGION_ARG >/dev/null 2>&1 || true

if ! aws lambda get-function-url-config --function-name "$FUNCTION_NAME" $REGION_ARG >/dev/null 2>&1; then
  aws lambda create-function-url-config --function-name "$FUNCTION_NAME" --auth-type NONE \
    --cors "{\"AllowOrigins\":[\"${ALLOWED_ORIGIN}\"],\"AllowMethods\":[\"POST\"],\"AllowHeaders\":[\"content-type\"]}" $REGION_ARG >/dev/null
else
  aws lambda update-function-url-config --function-name "$FUNCTION_NAME" --auth-type NONE \
    --cors "{\"AllowOrigins\":[\"${ALLOWED_ORIGIN}\"],\"AllowMethods\":[\"POST\"],\"AllowHeaders\":[\"content-type\"]}" $REGION_ARG >/dev/null
fi

URL="$(aws lambda get-function-url-config --function-name "$FUNCTION_NAME" --query FunctionUrl --output text $REGION_ARG)"
rm -f function.zip
echo ""
echo "✅ Deployed. Function URL:"
echo "   $URL"
echo ""
echo "Next: set this as VITE_CHAT_API_URL for the production build, then redeploy the site."
echo "  • GitHub Actions: add repo secret VITE_CHAT_API_URL = $URL"
echo "  • Or local prod build: VITE_CHAT_API_URL=$URL npm run build"
