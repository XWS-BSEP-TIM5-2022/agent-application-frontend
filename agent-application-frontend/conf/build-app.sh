AGENT_API_URL=$1

cd app || exit
export API_HOST=${AGENT_API_URL}

apk --update --no-cache add \
  gettext=0.20.1-r2 && \

envsubst < environment.ts > ./src/environments/environment.ts || exit
npm run build --prod && \
cd dist && \
mv "$(find . -maxdepth 1 -type d | tail -n 1)" /app