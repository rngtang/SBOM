FROM ruby:3.2.2

### System dependencies
RUN apt-get update -y
RUN apt-get install -y build-essential libpq-dev nodejs

### Install Gems
RUN mkdir /app
WORKDIR /app 
ADD ./Gemfile .
ADD ./Gemfile.lock .
RUN bundle install