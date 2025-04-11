import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllProducts = async () => {
  return await prisma.product.findMany();
};

export const getProductById = async (id) => {
  return await prisma.product.findUnique({ where: { id: parseInt(id) } });
};

export const createProduct = async (data) => {
  return await prisma.product.create({ data });
};

export const updateProduct = async (id, data) => {
  return await prisma.product.update({
    where: { id: parseInt(id) },
    data,
  });
};

export const deleteProduct = async (id) => {
  return await prisma.product.delete({ where: { id: parseInt(id) } });
};
