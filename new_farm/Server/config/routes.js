/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/
  // '/': { view: 'pages/homepage' },
  '/': {
    view: 'index.html'
  },



  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/

  'POST /user/login': {
    controller: "LoginController",
    action: "login"
  },
  'POST /user/logout': {
    controller: "LoginController",
    action: "logout"
  },
  'POST /api/user/check_token': {
    controller: "UserController",
    action: "check_token"
  },
  'POST /api/user/index': {
    controller: "UserController",
    action: "index"
  },
  'POST /api/user/update': {
    controller: "UserController",
    action: "query"
  },
  'PUT /api/user/update': {
    controller: "UserController",
    action: "update"
  },
  'POST /api/user/updpwd': {
    controller: "UserController",
    action: "updpwd"
  },


  'PUT /api/user/create': {
    controller: "UserController",
    action: "create"
  },
  'DELETE /api/user/delete': {
    controller: "UserController",
    action: "delete"
  },

  'POST /api/menu/find_all_menu': {
    controller: "MenuController",
    action: "find_all_menu"
  },
  'POST /api/menu/menus': {
    controller: "MenuController",
    action: "menus"
  },
  'POST /api/menu/update': {
    controller: "MenuController",
    action: "query"
  },
  'PUT /api/menu/update': {
    controller: "MenuController",
    action: "update"
  },
  'PUT /api/menu/create': {
    controller: "MenuController",
    action: "create"
  },
  'DELETE /api/menu/delete': {
    controller: "MenuController",
    action: "delete"
  },

  'POST /api/dept/findall': {
    controller: "DeptController",
    action: "findall"
  },
  'POST /api/dept/update': {
    controller: "DeptController",
    action: "query"
  },
  'PUT /api/dept/update': {
    controller: "DeptController",
    action: "update"
  },
  'PUT /api/dept/create': {
    controller: "DeptController",
    action: "create"
  },
  'DELETE /api/dept/delete': {
    controller: "DeptController",
    action: "delete"
  },

  'POST /api/dictData/index': {
    controller: "DictDataController",
    action: "index"
  },
  'POST /api/dictData/update': {
    controller: "DictDataController",
    action: "query"
  },
  'PUT /api/dictData/update': {
    controller: "DictDataController",
    action: "update"
  },
  'PUT /api/dictData/create': {
    controller: "DictDataController",
    action: "create"
  },
  'DELETE /api/dictData/delete': {
    controller: "DictDataController",
    action: "delete"
  },

  'POST /api/dict/index': {
    controller: "DictController",
    action: "index"
  },
  'POST /api/dict/update': {
    controller: "DictController",
    action: "query"
  },
  'PUT /api/dict/update': {
    controller: "DictController",
    action: "update"
  },
  'PUT /api/dict/create': {
    controller: "DictController",
    action: "create"
  },
  'DELETE /api/dict/delete': {
    controller: "DictController",
    action: "delete"
  },

  'POST /api/post/index': {
    controller: "PostController",
    action: "index"
  },
  'POST /api/post/update': {
    controller: "PostController",
    action: "query" 
  },
  'PUT /api/post/update': {
    controller: "PostController",
    action: "update"
  },
  'PUT /api/post/create': {
    controller: "PostController",
    action: "create"
  },
  'DELETE /api/post/delete': {
    controller: "PostController",
    action: "delete"
  },

  'POST /api/role/index': {
    controller: "RoleController",
    action: "index"
  },
  'POST /api/role/update': {
    controller: "RoleController",
    action: "query"
  },
  'PUT /api/role/update': {
    controller: "RoleController",
    action: "update"
  },
  'PUT /api/role/create': {
    controller: "RoleController",
    action: "create"
  },
  'DELETE /api/role/delete': {
    controller: "RoleController",
    action: "delete"
  },


  'POST /api/configs/index': {
    controller: "ConfigsController",
    action: "index"
  },
  'POST /api/configs/update': {
    controller: "ConfigsController",
    action: "query"
  },
  'PUT /api/configs/update': {
    controller: "ConfigsController",
    action: "update"
  },  
  'PUT /api/configs/create': {
    controller: "ConfigsController",
    action: "create"
  },





  
  'POST /api/device/index': {
    controller: "DeviceController",
    action: "index"
  },
  'POST /api/device/update': {
    controller: "DeviceController",
    action: "query"
  },
  'PUT /api/device/update': {
    controller: "DeviceController",
    action: "update"
  },  
  'PUT /api/device/create': {
    controller: "DeviceController",
    action: "create"
  },

  'POST /api/devicetype/index': {
    controller: "DeviceTypeController",
    action: "index"
  },
  'POST /api/devicetype/update': {
    controller: "DeviceTypeController",
    action: "query"
  },
  'PUT /api/devicetype/update': {
    controller: "DeviceTypeController",
    action: "update"
  },  
  'PUT /api/devicetype/create': {
    controller: "DeviceTypeController",
    action: "create"
  },

  'POST /api/sysuser/index': {
    controller: "SysuserController",
    action: "index"
  },
  'POST /api/sysuser/update': {
    controller: "SysuserController",
    action: "query"
  },
  'PUT /api/sysuser/update': {
    controller: "SysuserController",
    action: "update"
  },  
  'PUT /api/sysuser/create': {
    controller: "SysuserController",
    action: "create"
  },

  'POST /api/farm/index': {
    controller: "FarmController",
    action: "index"
  },
  'POST /api/farm/update': {
    controller: "FarmController",
    action: "query"
  },
  'PUT /api/farm/update': {
    controller: "FarmController",
    action: "update"
  },  
  'PUT /api/farm/create': {
    controller: "FarmController",
    action: "create"
  },



  'POST /api/products/index': {
    controller: "FarmproductsController",
    action: "index"
  },
  'POST /api/products/update': {
    controller: "FarmproductsController",
    action: "query"
  },
  'PUT /api/products/update': {
    controller: "FarmproductsController",
    action: "update"
  },  
  'PUT /api/products/create': {
    controller: "FarmproductsController",
    action: "create"
  },
  
  

  'POST /api/producter/index': {
    controller: "ProducterController",
    action: "index"
  },
  'POST /api/producter/update': {
    controller: "ProducterController",
    action: "query"
  },
  'PUT /api/producter/update': {
    controller: "ProducterController",
    action: "update"
  },  
  'PUT /api/producter/create': {
    controller: "ProducterController",
    action: "create"
  },



  

  'POST /api/task/index': {
    controller: "TaskController",
    action: "index"
  },
  'POST /api/task/update': {
    controller: "TaskController",
    action: "query"
  },
  'PUT /api/task/update': {
    controller: "TaskController",
    action: "update"
  },  
  'PUT /api/task/create': {
    controller: "TaskController",
    action: "create"
  },

  
  'POST /api/cropland/index': {
    controller: "CroplandController",
    action: "index"
  },
  'POST /api/cropland/update': {
    controller: "CroplandController",
    action: "query"
  },
  'PUT /api/cropland/update': {
    controller: "CroplandController",
    action: "update"
  },  
  'PUT /api/cropland/create': {
    controller: "CroplandController",
    action: "create"
  },


  'POST /api/ht/index': {
    controller: "HtController",
    action: "index"
  },
};
