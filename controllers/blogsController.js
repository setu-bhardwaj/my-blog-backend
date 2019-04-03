const express = require('express');  //importing express js
const app = express(); //craeting instance
const mongoose = require('mongoose');
//const Blog =require('../models/blog');
const shortid = require('shortid');
const response = require('./../libs/responseLib')

//let helloWorld = (req,res)=> res.send('Hello World!!');
//let printexample = (req,res) => res.send('printExample'); 

//Importing the model here 
const BlogModel = mongoose.model('Blog');

// let testRoute = (req,res) =>{
//   console.log(req.params);
//   res.send(req.params);
// }

// let testQuery = (req,res) =>{
//     console.log(req.query);
//     res.send(req.query);
//   }

//   let testBody = (req,res) =>{
//     console.log(req.body);
//     res.send(req.body);
//   }



let getAllBlog = (req, res) => {
    BlogModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                res.send(err)
            } else if (result == undefined || result == null || result == '') {
                console.log('No Blog Found')
                res.send("No Blog Found")
            } else {
                res.send(result)
            }
        })
}// end get all blogs
/**
 * function to read single blog.
 */
let viewByBlogId = (req, res) => {
    console.log(req.user)

    BlogModel.findOne({ 'blogId': req.params.blogId }, (err, result) => {

        if (err) {
            console.log(err)
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            console.log('No Blog Found')
            res.send("No Blog Found")
        } else {
            res.send(result)

        }
    })
}

/**
 * function to read blogs by category.
 */
let viewByCategory = (req, res) => {

    BlogModel.find({ 'category': req.params.category }, (err, result) => {

        if (err) {
            console.log(err)
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            console.log('No Blog Found')
            res.send("No Blog Found")
        } else {
            res.send(result)

        }
    })
}

/**
 * function to read blogs by author.
 */
let viewByAuthor = (req, res) => {

    BlogModel.find({ 'author': req.params.author }, (err, result) => {

        if (err) {
            console.log(err)
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            console.log('No Blog Found')
            res.send("No Blog Found")
        } else {
            res.send(result)

        }
    })
}

/**
 * function to create the blog.
 */
let createBlog = (req, res) => {
    var today = Date.now()
    let blogId = shortid.generate();

    let newBlog = new BlogModel({

        blogId: blogId,
        title: req.body.title,
        description: req.body.description,
        bodyHtml: req.body.blogBody,
        isPublished: true,
        category: req.body.category,
        author: req.body.fullName,
        created: today,
        lastModified: today
    }) // end new blog model


    let tags = (req.body.tags != undefined && req.body.tags != null && req.body.tags != '') ? req.body.tags.split(',') : []
    newBlog.tags = tags
    //if tags not checked, spilit function may crash.

    newBlog.save((err, result) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            res.send(result)

        }
    }) // end new blog save
}

/**
 * function to edit blog by admin.
 */
let editBlog = (req, res) => {

    let options = req.body; 
    console.log(options);
    BlogModel.update({ 'blogId': req.params.blogId }, options, { multi: true }).exec((err, result) => {

        if (err) {
            console.log(err)
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            console.log('No Blog Found')
            res.send("No Blog Found")
        } else {
            res.send(result)

        }
    })
}

/**
 * function to increase views of a blog.
 */
let increaseBlogView = (req, res) => {

    BlogModel.findOne({ 'blogId': req.params.blogId }, (err, result) => {

        if (err) {
            console.log(err)
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            console.log('No Blog Found')
            res.send("No Blog Found")
        } else {
            
            result.views += 1;
            result.save(function (err, result) {
                if (err) {
                    console.log(err)
                    res.send(err)
                }
                else {
                    console.log("Blog updated successfully")
                    res.send(result)

                }
            });// end result

        }
    })
}




/**
 * function to delete the assignment collection.
 */
let deleteBlog = (req, res) => {
    BlogModel.remove({ 'blogId': req.params.blogId }, (err, result) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            console.log('No Blog Found')
            res.send("No Blog Found")
        } else {
            res.send(result)

        }
    })
}



module.exports = {
   // helloWorld:helloWorld,
    //printexample:printexample
    //testRoute:testRoute,
    // testQuery:testQuery,
    // testBody:testBody
    getAllBlog: getAllBlog,
    createBlog: createBlog,
    viewByBlogId: viewByBlogId,
    viewByCategory: viewByCategory,
    viewByAuthor: viewByAuthor,
    editBlog: editBlog,
    deleteBlog: deleteBlog,
   increaseBlogView: increaseBlogView


}