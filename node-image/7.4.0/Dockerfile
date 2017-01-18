FROM mhart/alpine-node:7.4.0
ENV WAITFORIT_VERSION="v1.3.1"
ENV ONVAULT_VERSION="v1.7.2"
RUN apk add --no-cache bash curl git openssh-client && \
# Install waitforit utility
# https://github.com/maxcnunes/waitforit
    curl -o /usr/local/bin/waitforit -sSL https://github.com/maxcnunes/waitforit/releases/download/$WAITFORIT_VERSION/waitforit-linux_amd64 && \
    chmod +x /usr/local/bin/waitforit && \
# Install Dockito Vault ONVAULT utility
# https://github.com/dockito/vault
    curl -o /usr/local/bin/ONVAULT -sSL https://raw.githubusercontent.com/dockito/vault/$ONVAULT_VERSION/ONVAULT && \
    chmod +x /usr/local/bin/ONVAULT && \
    mkdir -p /usr/src/app
WORKDIR /usr/src/app
CMD [ "npm", "start" ]
