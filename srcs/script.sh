if [ ! -f ./backend/.env ]; then
    touch ./backend/.env
    echo "DATABASE_URL=${DATABASE_URL}" >> ./backend/.env
    echo "CLIENT_ID=${CLIENT_ID}" >> ./backend/.env
    echo "CLIENT_SECRET=${CLIENT_SECRET}" >> ./backend/.env
    echo "CALLBACK_URL=${CALLBACK_URL}" >> ./backend/.env
    cat ./backend/.env
    exit 0
fi

