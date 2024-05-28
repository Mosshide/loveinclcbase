import NotherBaseFS from "notherbase-fs";
import { fileURLToPath } from 'node:url';
const __dirname = fileURLToPath(new URL('./world', import.meta.url));

import nkjvBible from "./globals/NKJV.js";

const loveinclcFS = new NotherBaseFS(__dirname, { nkjvBible }, { 
    siteTitle: "Love INC of Lewis County",
    favicon: fileURLToPath(new URL('./public/img/favicon.ico', import.meta.url)),
 });