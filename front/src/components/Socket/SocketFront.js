import React, { Fragment } from 'react';
import Nav from '../Nav';

import 'antd/dist/antd.css';
import { Row, Col, Input, Layout, Form, Upload, Icon, Button, Select, Radio } from 'antd';

const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;

const SocketClient = ({form: {getFieldDecorator}}) => {
    const handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    };

    const normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    };

    return (
        <Fragment>
            <Nav/>
            <div>
                <Layout>
                    <Content>Content</Content>
                    <Footer>
                        <Row>
                        <Col>
                            <Form onSubmit={handleSubmit}>
                                {/* <Form.Item label="Select[multiple]">
                                {getFieldDecorator('select-multiple', {
                                rules: [
                                    { required: true, message: 'Please select your favourite colors!', type: 'array' },
                                ],
                                })(
                                <Select mode="multiple" placeholder="Please select favourite colors">
                                    <Option value="red">Red</Option>
                                    <Option value="green">Green</Option>
                                    <Option value="blue">Blue</Option>
                                </Select>,
                                )}
                                </Form.Item> */}
                                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                                    {getFieldDecorator('dragger', {
                                        valuePropName: 'fileList',
                                        getValueFromEvent: normFile,
                                    })(
                                    <Upload.Dragger name="files" action="/upload.do">
                                    <p className="ant-upload-drag-icon">
                                        <Icon type="inbox" />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                                    </Upload.Dragger>,
                                    )}
                                </Form.Item>
                                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                                    <TextArea rows={4}/>
                                </Form.Item>
                                <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                        </Row>
                    </Footer>
                </Layout>
            </div>
        </Fragment>
    );
}

export default Form.create()(SocketClient);