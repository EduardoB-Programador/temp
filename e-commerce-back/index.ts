import { Hono } from "hono";
import admin from "./src/routes/adminRotas";
import pagamento from "./src/routes/pagRotas";
import usuario from "./src/routes/userRotas";
import produto from "./src/routes/prodRotas";
import { cors } from "hono/cors";

const app = new Hono()

app.get('/', async c => {
    return c.json({message:''})
})
.use(cors())
.route('/admin', admin)
.route('/pagamento', pagamento)
.route('/usuario', usuario)
.route('/produto', produto)

export default app