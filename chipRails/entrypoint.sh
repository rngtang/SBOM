#!/bin/bash
set -e

if [ -f tmp/pids/server.pid ]; then
  rm tmp/pids/server.pid
fi

exec bundle exec "$@"

gem install devise
gem install devise_saml_authenticatble