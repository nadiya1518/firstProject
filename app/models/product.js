const connection = require('../config/db');

module.exports={

    getAllProduct: () =>{
        return new Promise((resolve, reject)=> {
            connection.query("SELECT product.*, category.name as 'category' FROM product INNER JOIN category ON product.id_category = category.id", (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            })
        })
    },

    getProductID: (id_product) =>{
        return new Promise((resolve, reject)=> {
            connection.query("SELECT product.*, category.name as 'category' FROM product INNER JOIN category ON product.id_category = category.id WHERE product.id = ?", id_product, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                    console.log('Belum ada invoice')
                }
            })
        })
    },

    //insert data ke tabel product CREATE
    insertProduct: (data) =>{
        return new Promise((resolve, reject)=>{
            connection.query("INSERT INTO product SET ?", data, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            })
        })
    },

    updateProduct: (data, id_product) =>{
        return new Promise((resolve, reject)=>{
            connection.query("UPDATE product SET ? WHERE id = ?", [data, id_product], (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            })
        })
    },

    deleteProduct: (id_product) => {
        return new Promise((resolve, reject)=>{
            connection.query("DELETE FROM  product WHERE id = ?", id_product, (err,result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            })
        })
    },

    //SEARCH PRODUK BY NAME
    searchProduct: (name) => {  
        return new Promise((resolve, reject)=>{
            connection.query("SELECT product.*, category.name as 'category' FROM product INNER JOIN category ON product.id_category = category.id WHERE product.name LIKE ?", name, (err,result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            })
        })
    },

    //SORT PRODUK BY NAME
    sortProductName: () => {  
        return new Promise((resolve, reject)=>{
            connection.query("SELECT product.*, category.name as 'category' FROM product INNER JOIN category ON product.id_category = category.id ORDER BY product.name ASC", (err,result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            })
        })
    },

    //SORT PRODUCT BY CATEGORY
    sortProductCategory: () => {  
        return new Promise((resolve, reject)=>{
            connection.query("SELECT product.*, category.name as 'category' FROM product INNER JOIN category ON product.id_category = category.id ORDER BY category.name ASC", (err,result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            })
        })
    },

    //SORT PRODUCT BY DATE UPDATE ( TERBARU DAHULU)
    sortProductUpdate: () => {  
        return new Promise((resolve, reject)=>{
            connection.query("SELECT product.*, category.name as 'category' FROM product INNER JOIN category ON product.id_category = category.id ORDER BY product.updated_at DESC", (err,result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            })
        })
    },
    
    //PAGINATION 5
    pagination: (page) => {  
        return new Promise((resolve, reject)=>{
            const currentpage = parseInt(page);
            let totalpage = 0;
            const limit = 2;
            let offset = (currentpage * limit) - limit
            connection.query("SELECT COUNT(name) AS total FROM product", (err,result)=>{
                result.forEach(e=>{
                    totalpage = e.total
                })
                connection.query("SELECT product.*, category.name as 'category' FROM product INNER JOIN category ON product.id_category = category.id LIMIT ?, 2", offset ,(err, hasil)=>{
                let data = {
                    currentpage : currentpage,
                    totalpage : totalpage / 2,
                    data : hasil
                }
                
                console.log(data.totalpage)
                    if(currentpage === 0 ||currentpage > data.totalpage){
                        resolve([msg = 'Page Tidak Ada']);
                    }else{
                        resolve(data);                        
                    }
                })
            })
        })
    },



}