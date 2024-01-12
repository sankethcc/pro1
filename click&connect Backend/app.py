import flask, flask_pymongo, hashlib, werkzeug.security, flask_cors
from flask_cors import CORS
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
from bson import ObjectId, Binary

app = Flask(__name__)
flask_cors.cross_origin(
    methods=['GET', 'POST', 'HEAD', 'OPTIONS', 'PUT', 'DELETE'],
    headers=None,
    supports_credentials=False,
    max_age=None,
    send_wildcard=True,
    always_send=True,
    automatic_options=False
)

CORS(app)
# initializing database
app.config['MONGO_URI']= 'mongodb+srv://sankethcc:SX3fzO0qAonkLov2@cluster0.bvtt6xx.mongodb.net/users'
mongo_users = PyMongo(app)

app.config['MONGO_URI']= 'mongodb+srv://sankethcc:SX3fzO0qAonkLov2@cluster0.bvtt6xx.mongodb.net/products'
mongo_products = PyMongo(app)


@app.route('/')
def Home():
    return 'Hello Backend'

# sign up route
@app.route('/sign_up', methods=['POST'])
def Sign_Up():
    if 'first_name' and 'last_name' and 'email' and 'contact' and 'password' and 'gender' and 'user_id' and 'password' and 'gender' not in request.json:
        return jsonify({'error':'Details Missing'}), 400

    try:
        first_name = request.json['first_name']
        last_name = request.json['last_name']
        email = request.json['email']
        contact = request.json['contact']
        password = request.json['password']
        gender = request.json['gender']
        
        user_id = request.json['user_id']
        user = mongo_users.db.users.find_one({'user_id':user_id})
        if user:
            return jsonify({'messege':'User Id already exist'}), 403
        if len(password)<8:
            return jsonify({'message':'password must be 8 character'})
        hashed_password = generate_password_hash(password, method='pbkdf2')
        user_data = {
            "_id" : str(ObjectId()),
            "user_id": user_id,
            "first_name" : first_name,
            "last_name" :last_name,
            "email":email,
            "contact":contact,
            "password":hashed_password,
            "gender": gender,
            "blocked":False
        }
        inserted_id = mongo_users.db.users.insert_one(user_data).inserted_id
        inserted_user = mongo_users.db.users.find_one({"_id":inserted_id})
        return jsonify(inserted_user), 200
        
    except Exception as e:
        return jsonify({"error": "Error occurred", "exception" : str(e)}), 500
    
# get all user
@app.route('/get_users', methods=['GET'])
def get_users():
    try:
        all_users = list(mongo_users.db.users.find({"blocked":False}))
        return jsonify(all_users), 200
    except Exception as e:
        return jsonify({"error":"Error Occured", 'exception':str(e)}), 500

# get single user by user id
@app.route('/get_user/<user_id>', methods=['GET'])
def get_user(user_id):
    try:
        user = mongo_users.db.users.find_one({'user_id':user_id, "blocked":False})
        if user:
            return jsonify(user), 200
        else:
            return jsonify({"error":'User Not Found'}), 403
    except Exception as e:
        return jsonify({"error":'Error Occured', "Exception": str(e)}), 500
    
# update user details
@app.route('/update_user/<user_id>', methods=['PUT'])
def update_user(user_id):
    try:
        data = mongo_users.db.users.find_one({'user_id':user_id})
        if not data:
            return jsonify({"error":"User not found"})
        _id = data['_id']
        first_name = request.form.get('first_name', data['first_name'])
        last_name = request.form.get('last_name', data['last_name'])
        email = request.form.get('email', data['email'])
        contact = request.form.get('contact', data['contact'])
        gender = request.form.get('gender', data['gender'])

        user_data = {
            'first_name':first_name,
            'last_name':last_name,
            'email':email,
            'contact':contact,
            'gender':gender
        }
        # if user updates password then check old password is correct or not
        old_password = request.form.get('old_password')
        if old_password:
            if not check_password_hash(data['password'], old_password):
                return jsonify({"error":"Wrong Old password"}), 400
            new_password = request.form.get('new_password','')
            if new_password:
                hashed_password = generate_password_hash(new_password, method='pbkdf2')
                user_data['password'] = hashed_password
            else:
                hashed_password = data['password']
                user_data['password'] = hashed_password
        mongo_users.db.users.update_one({'_id':_id}, {'$set':user_data})
        updated_data = mongo_users.db.users.find_one({'user_id':user_id})
        return jsonify({"message":"User Updated Successfully","data":updated_data}), 200
    except Exception as e:
        return jsonify({"error":"Error Occured", "exception":str(e)}), 500

#delete a user, we are not removing user from database, only set to not show to any one
@app.route('/delete_user/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        user = mongo_users.db.users.find_one({'user_id':user_id})
        toggled = not user['blocked']
        mongo_users.db.users.update_one({'user_id':user_id}, {"$set":{"blocked":toggled}})
        if toggled:
            return jsonify({"message":'user Blocked successfully','user':user_id}), 200
        else:
            return jsonify({"message":'user Unblock successfully','user':user_id}), 200
    except Exception as e:
        return jsonify({"error":'Error Occured', "exception":str(e)}),500

#login route 
@app.route('/login', methods=['POST'])
def login():
    try:
        user_id = request.json['user_id']
        password = request.json['password']
        user = mongo_users.db.users.find_one({'user_id':user_id})
        if not user:
            return jsonify("user not found !"), 401
        if not check_password_hash(user['password'], password):
            return jsonify("wrong password"), 400
        return jsonify({"message":"Login Authentication Success", "data":user}), 200
    except Exception as e:
        return jsonify({"error":"Error Occured in Login","exception":str(e)}), 500
    
# cart management
# GET CART
@app.route('/get_cart/<user_id>', methods = ['GET'])
def get_cart(user_id):
    try:
        user_cart = mongo_products.db.cart.find_one({'user_id':user_id})
        if user_cart:
            mongo_products.db.products.find({'_id':user_cart['']})
        else:
            return jsonify([]),200
    except Exception as e:
        return jsonify({"error":"Error Occured", 'exception':str(e)})
# ADD TO CART OR INCREASE QUANTITY OF PRODUCT
@app.route('/add_to_cart', methods = ['POST'])
def add_to_cart():
    try:
        user_id = request.form.get('user_id')
        product_id = request.form.get('product_id')
        quantity = request.form.get('quantity')
        cart = mongo_products.db.cart.find_one({"user_id": user_id})
        if cart:
            querry = {"user_id": user_id, 'products.product_id':product_id} 
            isInCart = mongo_products.db.cart.find_one(querry)
            if isInCart:
                mongo_products.db.cart.update_one(querry,{'$inc':{'products.$.quantity':int(quantity)}} )
                return jsonify({'message':"product updated to cart"}),200
            else:
                mongo_products.db.cart.update_one({'user_id':user_id}, {'$push':{"products":{'product_id':product_id, 'quantity':int(quantity)}}})
                return jsonify({'message':"product added to cart"}), 200
        else:
            product = {
                'product_id':product_id,
                'quantity':quantity
            }
            data = {
                '_id':str(ObjectId()),
                'user_id':user_id,
                'products':[product]
            }
            inserted_id = mongo_products.db.cart.insert_one(data).inserted_id
            response = mongo_products.db.cart.find_one({'_id':inserted_id})
            return jsonify(response)

    except Exception as e :
        return jsonify({"error":'Error Add to card',"exception":str(e)})

# remove from cart or decrease quantity
@app.route('/remove_from_cart/<product_id>/<user_id>/', defaults={'quantity':None}, methods = ['PUT'])
@app.route('/remove_from_cart/<product_id>/<user_id>/<quantity>', methods = ['PUT'])
def remove_from_cart(product_id,user_id, quantity):
    try:
        if quantity:
            # agrigate = [{'$unwind':'$products'},{'$match':{'products.product_id':product_id}},{'$project':{'product_id': '$products.product_id','quantity': '$products.quantity', '_id': 0, 'product_id':1}}]
            # product_qty = mongo_products.db.cart.aggregate(agrigate)
            querry = {"user_id": user_id, 'products.product_id':product_id} 
            modified_Count = mongo_products.db.cart.update_one(querry,{'$inc':{'products.$.quantity':-int(quantity)}}).modified_count
            return jsonify({"message":"quantity decrement"})
        else:
            modifiedCount =mongo_products.db.cart.update_one({'user_id':user_id},{'$pull':{'products':{'product_id':product_id}}}).modified_count
            return jsonify({'message':'product removed'})
    except Exception as e:
        return jsonify({"error":'Error occured in removing from cart',"exception":str(e)})


#----------------CRUD OPERATION OF PRODUCTS-------------------
    
#Route for add new product
@app.route('/add_product', methods=['POST'])
def add_product():
    try:
        title = request.form.get('title')
        description = request.form.get('description')
        brand = request.form.get('brand')
        price = request.form.get('price')
        quantity = request.form.get('quantity')
        discount_percentage = request.form.get('discount_percentage')
        thumbnail = request.files.get('thumbnail')
        category = request.form.get('category')
        thumbnail_url = ''
        image_url = []
        if thumbnail:
            thumb_imageData = Binary(thumbnail.read())
            inserted_id = mongo_products.db.images.insert_one({'image_data':thumb_imageData}).inserted_id
            thumbnail_url = str(inserted_id)
            image_url.append(thumbnail_url)

        print(thumbnail)
        i = 0
        while True:
            image = request.files.get(f"image_{i}")
            if not image:
                break
            if image:
                image_data = Binary(image.read())
                inserted_id = mongo_products.db.images.insert_one({'image_data':image_data}).inserted_id
                image_url.append(str(inserted_id))
            i+=1
        product_data = {
            '_id':str(ObjectId()),
            'title':title,
            'description':description,
            'brand':brand,
            'quantity':int(quantity),
            'price':int(price),
            'discount_percentage':int(discount_percentage),
            'image':list(image_url),
            'blocked':False,
            'thumbnail': thumbnail_url,
            'category':category
        }
        inserted_id = mongo_products.db.products.insert_one(product_data).inserted_id
        inserted_data = mongo_products.db.products.find_one({'_id':inserted_id})
        return jsonify({"message":"Product Added", "data":inserted_data}), 200
    except Exception as e:
        return jsonify({"error":'Error Occured in adding product', "exception":str(e)}), 500

#get all product
@app.route('/get_products', methods=['GET'])
def get_products():
    try:
        products = list(mongo_products.db.products.find({}))
        return jsonify(products)
    except Exception as e:
        return jsonify({"error":"error in getting all products","exception":str(e)})
    
#get signle product by product id
@app.route("/get_product/<product_id>", methods=['GET'])
def get_product(product_id):
    try:
        product = mongo_products.db.products.find_one({'_id':product_id})
        return jsonify(product)
    except Exception as e:
        return jsonify({"error":"Error Getting Single Product", "exceptions":str(e)})

#route for get image 
@app.route('/get_image/<image_id>', methods=['GET'])
def get_image(image_id):
    try:
        image_data = mongo_products.db.images.find_one({'_id': ObjectId(image_id)})
        if image_data:
            response = app.response_class(image_data['image_data'], mimetype='image/jpeg')
            return response, 200
        else:
            return jsonify("No Image Found"), 403
    except Exception as e:
        return jsonify({"error":'Error Occured', "exception":str(e)}), 500
if __name__ == '__main__':
    app.run(debug=True)