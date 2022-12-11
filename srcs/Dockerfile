FROM nixos/nix AS builder
VOLUME [ "/app" ]
WORKDIR /app
ENV PATH /usr/local/bin:$PATH
ENV PATH="./node_modules/.bin$PATH"
EXPOSE 5173
EXPOSE 3000
RUN   nix-env -iA nixpkgs.nodejs-18_x   nixpkgs.nodePackages.pnpm  nixpkgs.concurrently  nixpkgs.node2nix
COPY  nix-backend /app/nix-backend 
COPY  nix-frontend /app/nix-frontend
RUN   concurrently  " cd ./nix-frontend; node2nix -16"  " cd ./nix-backend;  node2nix -16"
CMD   concurrently  "nix-build  /app/nix-backend/default.nix -A tarball"  "nix-build /app/nix-frontend/default.nix -A tarball -o ./result2"
Run   pnpm install  ./result/tarballs/*
COPY  .pnpm-store /app/backend/.pnpm-store
Run   pnpm install  ./result2/tarballs/*
COPY  .pnpm-store /app/frotend/.pnpm-store
CMD   concurrently  " cd ./frontend; pnpm run start"  " cd ./backend; pnpm run start"
