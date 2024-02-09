const express = require('express');
const router = express.Router();
// Import Model
const userModel = require("../db/userModel");


// & READ USER --------------------------------------------
// ~ Implementing swagger with get method below
/**
 * @swagger
 * /api/read:
 *   get:
 *     summary: Get a list of all users
 *     tags:
 *       - User Management
 *     description: Retrieve all the users in the database
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   fname:
 *                     type: string
 *                   lname:
 *                     type: string
 *                   age:
 *                     type: number
 */

router.get("/read", async (request, response) => {
    const users = await userModel.find();
    response.status(200).send({
        success: true,
        message: users
    })
})


// & INSERT USER --------------------------------------------
// ~ Implementing swagger with put method below
/**
 * @swagger
 * /api/insert:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - User Management
 *     description: Create a new user and insert into the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fname:
 *                 type: string
 *               lname:
 *                 type: string
 *               age:
 *                 type: number
 *     responses:
 *       200:
 *         description: User inserted into the database successfully.
 *       500:
 *         description: Failed to insert user in database
 */

router.post("/insert", async (request, response) => {
    const newUser = request.body;
    const savedUser = await userModel(newUser).save();
    if (savedUser) {
        response.status(200).send({
            success: true,
            message: "User saved to database successfully"
        })
    }
    else {
        response.status(500).send({
            success: false,
            message: "User failed to save in database"
        })
    }

})



// & UPDATE USER --------------------------------------------
// ~ Implementing swagger with post method below
/**
 * @swagger
 * /api/update/{fname}:
 *   put:
 *     summary: Update a user by fname
 *     tags:
 *       - User Management
 *     description: Update an existing user in the database by their fname
 *     parameters:
 *       - in: path
 *         name: fname
 *         required: true
 *         description: fname of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fname:
 *                 type: string
 *               lname:
 *                 type: string
 *               age:
 *                 type: number
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.put("/update/:fname", async (request, response) => {
    const {fname,lname,age} = request.body;
    const updateUser = await userModel.updateOne(
        { fname: request.params.fname },
        { $set: { fname:fname,lname:lname,age:age } }
    )
    if (updateUser.modifiedCount > 0) {
        response.status(200).send({
            success: true,
            message: "user updated successfully"
        })
    }
    else {
        response.status(500).send({
            success: false,
            message: "failed to updated user"
        })
    }
})






// & DELETE USER --------------------------------------------
// ~ Implementing swagger with delete method below
/**
 * @swagger
 * /api/delete/{fname}:
 *   delete:
 *     summary: Delete a user by fname
 *     tags:
 *       - User Management
 *     description: Delete an existing user from the database by their fname
 *     parameters:
 *       - in: path
 *         name: fname
 *         required: true
 *         description: fname of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */


router.delete("/delete/:fname", async (request, response) => {
    const deleteUser = await userModel.deleteOne({ fname: request.params.fname })
    if (deleteUser.deletedCount > 0) {
        response.status(200).send({
            success: true,
            message: "user delete successfully"
        })
    }
    else {
        response.status(500).send({
            success: false,
            message: "failed to delete the user"
        })
    }
})








module.exports = router;