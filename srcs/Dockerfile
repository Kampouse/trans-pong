FROM nixos/nix AS builder
VOLUME [ "/app" ]
WORKDIR /app
ENV PATH /usr/local/bin:$PATH
ENV PATH="./node_modules/.bin$PATH"
EXPOSE 5173
EXPOSE 3000
RUN   nix-env -iA nixpkgs.nodejs-18_x   nixpkgs.nodePackages.pnpm  nixpkgs.concurrently  nixpkgs.node2nix nixpkgs.vite
COPY  nix-backend /app/nix-backend 
COPY  nix-frontend /app/nix-frontend
RUN   concurrently  " cd ./nix-frontend; node2nix -16"  " cd ./nix-backend;  node2nix -16"
RUN   concurrently  "nix-build  /app/nix-backend/default.nix -A tarball -o /app/backend "  \
					"nix-build /app/nix-frontend/default.nix -A tarball -o /app/frontend"
RUN   cd /app/frontend;  pnpm install  --virtual-store-dir /app/frontend/.pnpm-store ./tarballs/*
RUN   cd /app/backend;  pnpm install  --virtual-store-dir /app/backend/.pnpm-store ./tarballs/*
CMD   concurrently  " cd /app/frontend/ pnpm run start"  " cd /app/backend; pnpm run start"

