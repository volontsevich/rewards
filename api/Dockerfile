FROM ruby:3.4.3

RUN apt-get update -qq && \
    apt-get install -y build-essential nodejs sqlite3 libsqlite3-dev

WORKDIR /app

COPY Gemfile Gemfile.lock ./
RUN gem install bundler -v 2.6.9 && bundle install

COPY . .


ENV RAILS_ENV=development
ENV BINDING=0.0.0.0
EXPOSE 3000

CMD ["bin/rails", "server", "-b", "0.0.0.0"]
