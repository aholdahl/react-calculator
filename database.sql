--DATABASE "react-calculator"

CREATE TABLE "history" (
    "id" SERIAL PRIMARY KEY,
    "equation" TEXT NOT NULL
);