import fs from 'fs'
import path from 'path';

export class ProductManager {
    constructor() {
        this.productosElegidos = [];
        this.id = 1;
        this.path = path;
    }
    deleteProduct(code) {
        const index = this.productosElegidos.findIndex(product => product.code === code);
        if (index === -1) {
            return "404 no se encontro ese id, me parece que te estas equivocando";
        }
        const deleteID = this.productosElegidos.splice(index, 1);
        fs.writeFile(`./arryPrd.JSON`, JSON.stringify(this.productosElegidos), (e) => {
            if (e) {
                console.log(e);
            } else {
                console.log("Todo bien");
            }
        });
        return deleteID;
    }
    updateProduct(code, camp, upd) {
        const prds = this.getProducts();
        const prd = prds.find(element => element.code === code);
        prd[camp] = upd;
        fs.writeFile(`./arryPrd.json`, JSON.stringify(prds), (e) => {
            if (e) {
                console.log(e);
            } else {
                console.log("Todo bien");
            }
        });
    }
    getProductById(code) {
        const prds = this.getProducts();
        const prd = prds.find(element => element.code === code);
        return prd;
    }
    getProducts() {
        return JSON.parse(fs.readFileSync('./arryPrd.json', 'utf8'))
      }
    addProduct(element) {
        const a = this.productosElegidos.find((e) => e.code === element.code);
        if (!a) {
          this.productosElegidos.push(element);
        } else {
          console.log('El producto ya existe');
          return;
        }
        fs.writeFile(
          './arryPrd.json',
          JSON.stringify(this.productosElegidos),
          (e) => {
            if (e) {
              console.log(e);
              return;
            }
            console.log('Producto agregado exitosamente');
          }
        );
      }
}