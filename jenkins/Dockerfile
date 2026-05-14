FROM jenkins/jenkins:lts

USER root

# Install Docker CLI and Node.js
RUN apt-get update && \
    apt-get install -y curl ca-certificates gnupg lsb-release git docker.io && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm@11.14.1 && \
    mkdir -p /usr/libexec/docker/cli-plugins /usr/lib/docker/cli-plugins && \
    curl -L "https://github.com/docker/compose/releases/download/v2.20.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/libexec/docker/cli-plugins/docker-compose && \
    chmod +x /usr/libexec/docker/cli-plugins/docker-compose && \
    ln -sf /usr/libexec/docker/cli-plugins/docker-compose /usr/local/bin/docker-compose && \
    rm -rf /var/lib/apt/lists/*

# Ensure Jenkins user can access Docker socket if running as root in compose
RUN groupadd -g 999 docker || true && usermod -aG docker jenkins || true

USER root
