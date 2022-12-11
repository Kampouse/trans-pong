FROM nixos/nix AS builder
VOLUME [ "/app" ]
WORKDIR /app
ENV PATH /usr/local/bin:$PATH
ENV PATH="./node_modules/.bin$PATH"
EXPOSE 5173
EXPOSE 3000
COPY  nix-backend /app/nix-backend 
COPY  nix-frontend /app/nix-frontend
RUN   nix-env -iA nixpkgs.nodejs-18_x   nixpkgs.nodePackages.pnpm  nixpkgs.concurrently 
RUN   nix-build  /app/nix-backend/default.nix -A tarball && pnpm install ./result/tarballs/* && pnpm install
COPY .pnpm-store  /app/backend/.pnpm_store
RUN   nix-build  /app/nix-frontend/default.nix -A tarball -o ./result2 && pnpm install  ./result2/tarballs/* && pnpm install
COPY .pnpm-store  /app/frontend/.pnpm_store
CMD   concurrently  " cd ./frontend; pnpm run start"  " cd ./backend; pnpm run start"
