import { Request, Response } from "express";
import httpStatus = require("http-status");
const fsP = require("fs/promises");
// const data = require('../../data.json')
require("dotenv").config();
const filePath = process.env.DATAFILEPATH || "src/data.json";

type User = {
  name: string;
  age: number;
  _id: number;
  dob: string;
};

function getAge(dob: string): number {
  let date = new Date(dob);

  let monthDiffrence = Date.now() - date.getTime();

  let ageDate = new Date(monthDiffrence);

  let year = ageDate.getUTCFullYear();

  let age = Math.abs(year - 1970);
  return age;
}

const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, dob } = req.body;
    if (name && dob) {
      console.log(name, dob);
      const age = getAge(dob);
      const _id: number = Date.now();
      const jsonData = await fsP.readFile(filePath, "utf8");
      console.log(jsonData, "create");
      const products: User[] = JSON.parse(jsonData);
      console.log(jsonData);
      products.push({ name, age, _id, dob });
      await fsP.writeFile("src/data.json", JSON.stringify(products));
      res.json({
        status: "Success",
        message: "Your Data Successfully Posted",
      });
    } else {
      res.status(httpStatus.NO_CONTENT).json({
        status: "error",
        message: "Connot Post Empty",
      });
    }
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Fail to post Data",
    });
  }
};
const getAllProducts = async (req: any, res: any) => {
  console.log("hai");
  try {
    const jsonData = await fsP.readFile(filePath, "utf8");
    console.log(jsonData);
    const products: User[] = JSON.parse(jsonData);

    if (products.length) {
      res.json({
        status: "success",

        data: products,
      });
    } else {
      res.status(httpStatus.NO_CONTENT).json({
        status: "success",

        message: "No Record Found",
      });
    }
  } catch (error) {
    // console.log(error)
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",

      message: "Something went Wrong",
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { name, dob } = req.body;

    if (name && dob) {
      const jsonData = await fsP.readFile(filePath, "utf8");

      const products: User[] = JSON.parse(jsonData);

      const findProduct = products.find((prod) => prod._id === parseInt(id));

      if (findProduct) {
        const age = getAge(dob);
        findProduct.name = name;

        findProduct.dob = dob;
        findProduct.age = age;

        await fsP.writeFile("src/data.json", JSON.stringify(products));

        res.status(200).json({
          status: "success",

          message: "Your data updated successfully",

          updatedProduct: findProduct,
        });
      } else {
        res.status(httpStatus.NOT_FOUND).json({
          status: "error",
          message: "User not found",
        });
      }
    } else {
      res.status(httpStatus.NO_CONTENT).json({
        status: "error",

        message: "Field Should not be Empty",
      });
    }
  } catch (error) {
    res.json();
  }
};

const deleteByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    const jsonData = await fsP.readFile(filePath, "utf8");
    const products: User[] = JSON.parse(jsonData);
    const deleteIndex = products.findIndex((prod) => prod._id === Number(id));
    console.log(deleteIndex);
    if (deleteIndex !== -1) {
      const deletedProduct = products.splice(deleteIndex, 1);
      console.log(deletedProduct);
      await fsP.writeFile(filePath, JSON.stringify(products));

      res.status(200).json({
        status: "success",
        message: "User Deleted Successfully",
        deletedProduct,
      });
    } else {
      res.status(httpStatus.UNAUTHORIZED).json({
        status: "error",
        message: "Id not Found",
      });
    }
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Something Went Wrong",
    });
  }
};
export { createProduct, updateProduct, getAllProducts, deleteByID };
