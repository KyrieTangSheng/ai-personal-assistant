"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserDetailByUserId = void 0;
const supabase_client_1 = require("../services/supabase-client");
const GetUserDetailByUserId = async (userId) => {
    const { data: userDetail, error } = await supabase_client_1.supabase
        .from("users")
        .select("*")
        .eq("id", userId) // to be modified
        .single();
    if (error) {
        throw new Error(error.message);
    }
    return userDetail || { username: "Default User" };
};
exports.GetUserDetailByUserId = GetUserDetailByUserId;
