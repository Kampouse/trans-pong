#!/bin/bash

date -u

npx prisma generate
npx prisma db push

exec "$@"