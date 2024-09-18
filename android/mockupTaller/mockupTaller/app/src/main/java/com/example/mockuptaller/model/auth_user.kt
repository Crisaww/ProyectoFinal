package com.example.mockuptaller.model

import java.sql.Timestamp

data class auth_user(
    var  id: Int,
    var email: String,
    var password: String,
    var username:String,
    var last_login: Timestamp,
    var is_staff: Int,
    var is_active: Int,
    var date_jonied: Timestamp
)
