const express = require("express");
const pool = require("./db");
const app = express();
const PORT = 5000;
const cors = require("cors");

app.use(cors({
    origin: "http://localhost:3000",
}))
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello Express");
});

//ユーザー情報をすべて取得する
app.get("/users", (req, res) => {
    pool.query("select * from users", (error, results) => {
        if (error) throw error;
        // console.log("全権取得できました。");
        return res.status(200).json(results.rows);
    })
});

//特定のユーザーを取得する。
app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    pool.query("select * from users where id = $1", [id], (error, results) => {
        if (error) throw error;
        return res.status(200).json(results.rows);
    })
});

//ユーザーを追加する
app.post("/users", (req, res) => {
    const { name, email, age } = req.body;
    //ユーザーがすでに存在しているかを確認する
    pool.query("select s from users s where s.email = $1", [email], (error, results) => {
        if (results.rows.length) {
            return res.send("すでにユーザーが存在します");
        }
        pool.query("insert into users (name,email,age) values($1,$2,$3)", [name, email, age],
            (error, results) => {
                if (error) throw error;
                res.status(201).send("ユーザー作成に成功しました");
            })
    });
});

//ユーザーを削除する。
app.delete("/users/:id", (req, res) => {
    const id = req.params.id;

    pool.query("select * from users where id = $1", [id], (error, results) => {
        if (error) throw error;
        const userExisting = results.rows.length;

        if (!userExisting) res.send("ユーザーが存在しません。");

        pool.query("delete from users where id = $1", [id], (error, results) => {
            if (error) throw error;
            return res.status(200).send("削除に成功しました");
        });
    })
});

//ユーザーを更新する。
app.put("/users/:id", (req, res) => {
    const id = req.params.id;
    const name = req.body.name;

    pool.query("select * from users where id = $1", [id], (error, results) => {
        if (error) throw error;
        const userExisting = results.rows.length;

        if (!userExisting) res.send("ユーザーが存在しません。");

        pool.query("update users set name = $1 where id = $2", [name, id], (error, results) => {
            if (error) throw error;
            return res.status(200).send("更新に成功しました");
        });
    })
});


app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`);
})