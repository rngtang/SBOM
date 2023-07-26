FROM ruby:3.2.2

### System sbomComponents
RUN apt-get update -y
RUN apt-get install -y build-essential nodejs

### Install Gems
RUN mkdir /app
WORKDIR /app 
ADD ./Gemfile .
ADD ./Gemfile.lock .
RUN bundle install