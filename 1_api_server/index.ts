import express from 'express';
import { hello_world, order } from './controllers';

const app = express();
app.use(express.json())
app.get('/', hello_world);
app.post('/api/v1/order' , order)

app.listen(8000, ()=>console.log('running on 8000'))
