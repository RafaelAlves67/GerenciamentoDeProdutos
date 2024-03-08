import Product from "../models/Product.js";

export class ProductController {

    // LER TODOS PRODUTOS
    static async getProducts(req,res){
        const products = await Product.find()

        if(products.length === 0){
            return res.status(404).json({msg: "Nenhum produto encontrado!"})
        }

        return res.status(200).json(products) 
    }

    // LER PRODUTO INDIVIDUAL PELO ID
    static async getProductById(req, res){
        const id = req.params.id 

        const productExist = await Product.findOne({_id: id})

            if(!productExist){
                return res.status(404).json({msg: "Usuário não encontrado!"})
            }

            return res.status(200).json(productExist)
    }

    // CADASTRAR PRODUTOS
    static async createProducts(req,res){
        const {name,price,size} = req.body 

        if(!name){
            return res.status(401).json({msg: "O campo de nome não pode ficar vazio"})
        }

        if(!price){
            return res.status(401).json({msg: "O campo de preço não pode ficar vazio"})
        }

        if(!size){
            return res.status(401).json({msg: "O campo de tamanho não pode ficar vazio"})
        }

        try{
            const newProduct = new Product({name,price,size})
            newProduct.save()
    
            return res.status(200).json({msg: "Produto cadastrado com sucesso!"})
        }catch(error){
            console.log("Aconteceu o seguinte erro ao cadastrar produto! " + error)
            return res.status(500).json({msg: "Erro do servidor interno!"})
        }

    }

    // DELETAR PRODUTOS
    static async deleteProduct(req,res){
        const id = req.params.id 

        const productExist = await Product.findById(id)

        if(!productExist){
            return res.status(404).json({msg: "Produto não encontrado!"})      
        }

            await Product.deleteOne({_id: id})
            return res.status(200).json({msg: "Produto deletado com sucesso!"})
    }

    // EDITAR PRODUTO
    static async editProduct (req,res){
        const id = req.params.id 

        const {name, price, size} = req.body 

        const productEdit = {name, price, size}
    
        const productExist = await Product.findById(id)

        if(!productExist){
            return res.status(404).json({msg: "Produto não encontrado!"})      
        }

        await Product.updateOne({_id: id}, productEdit)

        const newProduct = await Product.findOne({_id: id})

        return res.status(200).json({msg: `Produto ${productExist.name} alterado!`, newProduct: newProduct})

    }
}