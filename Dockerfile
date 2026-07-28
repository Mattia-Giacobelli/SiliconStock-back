# ---------------------------------------------------
# STAGE 1: Build & Dependencies
# ---------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copiamo solo i manifest per sfruttare la cache di Docker
COPY package*.json ./

# Installiamo TUTTE le dipendenze (incluse devDependencies se usate per TypeScript/Build)
RUN npm ci

# Copiamo il resto del codice sorgente
COPY . .

# (Opzionale) Se usi TypeScript, decommenta la riga sottostante per la build
# RUN npm run build

# Rimuoviamo le devDependencies per lasciare solo quelle di produzione
RUN npm prune --production

# ---------------------------------------------------
# STAGE 2: Runtime Finale (Leggero e Sicuro)
# ---------------------------------------------------
FROM node:20-alpine AS runner

WORKDIR /app

# Impostiamo l'ambiente in produzione
ENV NODE_ENV=production

# Copiamo solo il necessario dallo stage di build
COPY package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app ./
# Se usi TypeScript e hai fatto la build in /dist, copia la cartella 'dist' invece di 'src':
# COPY --from=builder /app/dist ./dist

# Usiamo un utente non-root per questioni di sicurezza
USER node

# Esponiamo la porta (Google Cloud Run imposterà automaticamente la variabile d'ambiente PORT=8080)
EXPOSE 8080

# Avviamo l'applicazione
CMD ["node", "src/index.js"]