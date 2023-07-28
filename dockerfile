FROM rngtang/chip-image

WORKDIR /app

COPY . .

CMD ["./docker_install.sh"]