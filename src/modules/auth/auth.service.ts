import { Request, Response } from "express";
import { userIsExist } from "../../database/dao/auth.dao";
import { decryptPwd } from "../../util/bcrypt.util";
import { createToken } from "../../util/jwt.util";
import { AppResponse, createResponse } from "../../shared/appResponse.shared";
import httpStatus = require("http-status");

const loginSvc = async (logDetail: any) => {
  try {
    // const {uID,pwd} = logDetail
    const user = await userIsExist(logDetail.uID);
    if (user && "pwd" in user) {
      console.log(logDetail.pwd, user.pwd);
      const isUser = await decryptPwd(logDetail.pwd, user.pwd);
      console.log(isUser);
      if (isUser) {
        const token = await createToken(logDetail.uID);
        
        return createResponse(httpStatus.OK, "Login Successfully!", token);
      } else {
        return createResponse(httpStatus.FORBIDDEN, "Unauthorized User!");
      }
    }else{
      return createResponse(httpStatus.FORBIDDEN, "Unauthorized User!");
    }
  } catch (error) {
    console.log("Error while login ");
  }
};
export { loginSvc };

// const fsP = require("fs/promises");
// // const data = require('../../data.json')
// require("dotenv").config()
// const filePath = process.env.DATAFILEPATH || "src/data.json"

// type Product = {
//   pName: string;
//   pID: number;
//   price: number;
// };

// const createProduct = async (req: Request, res: Response) => {
//   try {
//     const { pName, price } = req.body;
//     if (pName && price) {
//       const pID = Date.now();
//       const jsonData = await fsP.readFile(filePath);
//       const products: Product[] = JSON.parse(jsonData);
//       const newProduct: Product = {
//         pID,
//         pName,
//         price,
//       };
//       products.push(newProduct);
//       const respose = await fsP.writeFile(filePath, JSON.stringify(products));
//       res.json({
//         status: "success",
//         respose,
//       });
//     }
//   } catch (error) {

//     res.status(400).json({
//       status: "error",
//       message: "Something Went Wrong",
//     });
//   }
// };
// const getAllProducts = async (req: any, res: any) => {
//   try {
//     const jsonData = await fsP.readFile(filePath);
//     console.log(jsonData)
//     const products: Product[] = JSON.parse(jsonData);

//     if (products.length) {
//       res.json({
//         status: "success",

//         data: products,
//       });
//     } else {
//       res.json({
//         status: "success",

//         message: "No Record Found",
//       });
//     }
//   } catch (error) {
//     // console.log(error)
//     res.status(400).json({
//       status: "error",

//       message: "Something went Wrong",
//     });
//   }
// };

// const updateProduct = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;

//     const { pName, price } = req.body;

//     if (pName && price) {
//       const jsonData = await fsP.readFile(filePath, "utf8");

//       const products: Product[] = JSON.parse(jsonData);

//       const findProduct = products.find((prod) => prod.pID === parseInt(id));

//       if (findProduct) {
//         findProduct.pName = pName;

//         findProduct.price = price;

//         await fsP.writeFile("src/data.json", JSON.stringify(products));

//         res.status(200).json({
//           status: "success",

//           message: "Product updated successfully",

//           updatedProduct: findProduct,
//         });
//       } else {
//         res.status(404).json({
//           status: "error",

//           message: "Product not found",
//         });
//       }
//     } else {
//       res.status(401).json({
//         status: "error",

//         message: "Field Should not be Empty",
//       });
//     }
//   } catch (error) {
//     res.json();
//   }
// };

// const deleteByID = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;

//     const jsonData = await fsP.readFile(filePath, "utf8");
//     const products: Product[] = JSON.parse(jsonData);
//     const deleteIndex = products.findIndex((prod) => prod.pID === Number(id));

//     if (deleteIndex !== -1) {
//       const deletedProduct = products.slice(deleteIndex, 1);
//       await fsP.writeFile(filePath, JSON.stringify(products));

//       res.status(200).json({
//         status: "success",
//         message: "Product Deleted Successfully",
//         deletedProduct,
//       });
//     } else {
//       res.status(401).json({
//         status: "error",
//         message: "Id not Found",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: "Something Went Wrong",
//     });
//   }
// };
// export { createProduct, updateProduct, getAllProducts, deleteByID }
