package com.example.mockuptaller.model

import java.sql.Timestamp

data class authtoken_token(
    val key: String,
    val create: Timestamp,
    val user_id: Int
)
