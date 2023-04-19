import React from "react";
import {
  MdOutlineApartment,
  MdHouseSiding,
  MdOutlineWater,
} from "react-icons/md";
import { BsSnow } from "react-icons/bs";
import { GiKidSlide } from "react-icons/gi";
import { AiOutlineCoffee } from "react-icons/ai";

export const locationsTab = [
  { id: 1, label: "Design", icon: <MdOutlineApartment size={24} /> },
  { id: 2, label: "Arctic", icon: <BsSnow size={24} /> },
  { id: 3, label: "Shared Homes", icon: <MdHouseSiding size={24} /> },
  { id: 4, label: "LakeFront", icon: <MdOutlineWater size={24} /> },
  { id: 5, label: "National Parks", icon: <GiKidSlide size={24} /> },
  { id: 6, label: "Bed & Breakfast ", icon: <AiOutlineCoffee size={24} /> },
];

export const rolesList = [
  { roleCode: "admin", roleName: "admin" },
  { roleCode: "lessor", roleName: "lessor" },
  { roleCode: "tenant", roleName: "tenant" },
];

export const genders = ["Male", "Female"];
