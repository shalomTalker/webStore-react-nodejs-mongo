import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addProdForm, editProdForm } from './inputsModel';
import { CLEAR_FORM, ON_INPUT} from '../actions/types'

import CustomForm from './CustomForm';
import CustomSelect from './CustomSelect'

import * as manageActions from '../actions/manageActions'
import * as dataActions from '../actions/dataActions'


class ProductForm extends Component {
    constructor(props) {
        super(props);
        this.url = this.props.location.pathname.split('?')[0]
        this.typePath = this.props.location.pathname.split('/')[2];
        this.title = "";
        this.image = React.createRef();
        this.canvas = React.createRef();
        console.log(this.url)
    }

    drawImageScaled = (img, ctx) => {
        var canvas = ctx.canvas;
        var hRatio = canvas.width / img.width;
        var vRatio = canvas.height / img.height;
        var ratio = Math.min(hRatio, vRatio);
        var centerShift_x = (canvas.width - img.width * ratio) / 2;
        var centerShift_y = (canvas.height - img.height * ratio) / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, img.width, img.height,
            centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    }
    handleFile = (e) => {
        const reader = new FileReader();
        const input = e.target;
        console.log(input.files)
        reader.onload = (upload) => {
            var img = new Image();
            img.onload = (e) => {
                let imgNode = input.parentNode.querySelector('img')
                let canvasNode = document.querySelector('canvas')
                let context = canvasNode.getContext('2d');
                if (input.parentNode.contains(imgNode)) {
                    input.parentNode.removeChild(imgNode)
                }
                this.drawImageScaled(img, context)
            }
            img.src = reader.result
        };
(input.files[0])&&
        reader.readAsDataURL(input.files[0]);
        console.log(input.files[0])
        this.props.onInput("image", input.files[0])
    }
    componentDidMount = () => {
        if (this.typePath === 'edit') {
            const obj = Object.assign({ product_id: this.props.selectedProduct._id }, this.props.selectedProduct)
            delete obj._id;
            for (const key in obj) {
                const value = obj[key];
                this.props.onInput(key, value)
            };

            const canvas = this.refs.canvas
            const ctx = canvas.getContext("2d")
            const img = this.refs.image
            img.onload = () => {

                this.drawImageScaled(img, ctx)
            }

        }

    }
    generateFormDataObj = () =>  {
        let dataObj = new FormData();
        dataObj.append('category_id', this.props.form.category_id)
        dataObj.append('price', (Math.round(this.props.form.price)-0.01))
        dataObj.append('name', this.props.form.name)
        dataObj.append('image', this.props.form.image)
        if(this.typePath === 'edit'){
            dataObj.append('product_id', this.props.selectedProduct._id);
        } 
        return dataObj
    }
    componentWillMount = () => {
        if (!this.props.errorMessage) {
            this.props.clearForm()
        }
        switch (this.typePath) {
            case "add":
                this.title = 'Add';
                this.formModel = addProdForm
                this.prepareData = async () => {
                    const data = this.generateFormDataObj();
                    await this.props.addProduct(this.url,data)
                }
                break;
            case "edit":
                this.title = 'Edit';
                this.formModel = editProdForm
                this.prepareData = async () => {
                    let data = {};
                    if (this.props.form.image === this.props.selectedProduct.image) {
                        data = this.props.form;
                    } else {
                        data = this.generateFormDataObj();
                    }
                    await this.props.editProduct(this.url,data)
                }
                break;

            default:
                break;
        };
    }
    onSubmit = async (e) => {
        e.preventDefault();
        await this.prepareData();
        await this.props.history.push('/manage/details/')
        this.props.history.push({
                pathname: '/dialog/notify',
                state: { dialogisOpen: true },
            params: this.props.notifyMessage
            })
    }
    render() {
        return (
            <div id={this.title} className="row" >
                <h4 className="col s12">{`Hi ${this.props.logedinUser.firstName}, in this panel you can ${this.title} your products`}</h4>
                <CustomForm

                    {...this.props}
                    handleFile={this.handleFile}
                    enctype="multipart/form-data"
                    btnSubmit={true}
                    title={`Please ${this.title} your details below:`}
                    onsubmit={this.onSubmit}
                    classcss="col s12 card-panel"
                    model={this.formModel}>
                    <canvas ref="canvas" />
                    {(this.props.selectedProduct) &&
                    <img ref="image" hidden src={`http://localhost:5000/${this.props.selectedProduct.image}`} alt={this.props.selectedProduct.name + " image"} />
                    }
                    <CustomSelect {...this.props} />
                </CustomForm>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        form: state.form,
        isAuthenticated: state.auth.isAuthenticated,
        errorMessage: state.message.errorMessage,
        notifyMessage: state.message.notifyMessage,
        logedinUser: state.data.logedinUser,
        selectedProduct: state.manage.selectedProduct
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addProduct: async (url, data) => {
            await dispatch(manageActions.addProduct(url, data))
            await dispatch(manageActions.initSelectedProduct(data))
            // await dispatch(dataActions.initDataProducts())
        },
        editProduct: async (url, data) => {
            await dispatch(manageActions.editProduct(url, data))
            await dispatch(manageActions.initSelectedProduct(data))
            // await dispatch(dataActions.initDataProducts())
        },
        onInput: (field, value) => {
            dispatch({
                type: ON_INPUT,
                payload: { name: field, value: value }
            })
        },
        clearForm: () => {
            dispatch({
                type: CLEAR_FORM
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductForm)