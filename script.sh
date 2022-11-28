if [ ! -f ./backend/.env ]; then
    touch ./backend/.env
    echo "DATABASE_URL='file:./dev.db'" >> ./backend/.env
    echo "CLIENT_ID= 'your client id'" >> ./backend/.env
    echo "CLIENT_SECRET='your secret'" >> ./backend/.env
    echo "CALLBACK_URL='http://localhost:3000/auth/42login'" >> ./backend/.env
    echo  "please fill the ./backend/env fill  with your own credentials"
    echo  "otherwise your backend wont work"
    cat ./backend/.env
    cd backend; npx prisma db pull && npx prisma generate
    echo "then run npm run dev again"
    exit 1
fi

