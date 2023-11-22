FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

ARG RECIPES_URL
ARG RECIPES_APP_ID
ARG RECIPES_APP_KEY

RUN echo "RECIPES_URL="$RECIPES_URL"">.env
RUN echo "RECIPES_APP_ID="$RECIPES_APP_ID"">.env
RUN echo "RECIPES_APP_KEY="$RECIPES_APP_KEY"">.env

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM base
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/.output /app/.output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
