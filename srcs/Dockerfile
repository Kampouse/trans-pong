FROM nixos/nix AS builder
VOLUME [ "/app" ]
WORKDIR /app
ENV PATH /usr/local/bin:$PATH
ENV PATH="./node_modules/.bin$PATH"
EXPOSE 5173
EXPOSE 3000
RUN   nix-env -iA nixpkgs.nodejs-18_x   nixpkgs.nodePackages.pnpm  nixpkgs.concurrently  nixpkgs.node2nix nixpkgs.vite nixpkgs.gnused 
EXPOSE 5173
EXPOSE 3000
CMD [ "pnpm", "start" ]
