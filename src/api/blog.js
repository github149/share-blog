import request from "../request/request"

const URL = {
    blogList: '/blog',
    blogId: '/blog/:blogId',
    create: "/blog",
    edit: "/blog/:blogId",
    deleteBlog: "/blog/:blogId"
}


export default {
    getBlogs({ page = 1, userId, atIndex } = { page: 1 }) {
        return request(URL.blogList, 'GET', { page, userId, atIndex })
    },
    getIndexBlogs({ page = 1 } = { page: 1 }) {
        return this.getBlogs({ page, atIndex: true })
    },
    getBlogsByUserId(userId, { page = 1, atIndex } = { page: 1 }) {
        return this.getBlogs({ userId, page, atIndex })
    },
    getDetail({ blogId }) {
        return request(URL.blogId.replace(':blogId', blogId))
    },
    createBlog({ title = "", content = "", description = "", atIndex = false } = { title: '', content: '', description: '', atIndex: false }) {
        return request(URL.create, 'POST', { title, content, description, atIndex })
    },
    updateBlog({ blogId }, { title, content, description, atIndex }) {
        return request(URL.edit.replace(':blogId', blogId), 'DELETE', { title, content, description, atIndex })
    },
    deleteBlog({ blogId }) {
        return request(URL.deleteBlog.replace(':blogId', blogId), 'DELETE')

    }
}