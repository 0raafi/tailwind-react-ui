import React, {CSSProperties, useState} from 'react';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { Meta } from '@storybook/react';
import {RadioChangeEvent, Space} from 'antd';
import 'antd/lib/space/style/index.css';

import {
  AutoComplete,
  Alert,
  Avatar,
  Button,
  Badge,
  Breadcrumb,
  Carousel,
  Card,
  DatePicker,
  Dropdown,
  GMap,
  Tooltip,
  Image,
  Icon,
  InputNumber,
  InputText,
  Menu,
  Modal,
  Pagination,
  Radio,
  Spinner,
  Stepper,
  Switch,
  TimePicker,
  useConfirm,
  useMessage,
  useErrorMessage,
  useNotification
} from '../src/index';
import { MessageType } from "../src/useMessage";

export default {
  title: 'Example/Sample Components',
	decorators: [withKnobs],
  component: Tooltip,
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  },  
} as Meta;

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
} as CSSProperties;

const options = [
  { value: 'Burns Bay Road' },
  { value: 'Broad Way Street' },
  { value: 'Downing Street' },
  { value: 'Wall Street' },
];

const items = [
  {
    label: '1st Layer'
  },
  {
    label: '2st Layer',
    link: '#',
  },
  {
    label: '3rd Layer',
    link: '#'
  },
  {
    label: '4th Layer',
    link: '#'
  },
  {
    label: '5th Layer',
    link: '#'
  },
  {
    label: '6th Layer',
    link: '#'
  },
  {
    label: '7th Layer',
    link: '#'
  }
];

const errors = ['Error 1', 'Error 2', 'Error 3', 'Error 4'];

const { SubMenu, Item, ItemGroup } = Menu;

const menu = (
  <Menu>
    <ItemGroup title="Group title">
      <Item>1st menu item</Item>
      <Item>2nd menu item</Item>
    </ItemGroup>
    <SubMenu title="sub menu">
      <Item>3rd menu item</Item>
      <Item>4th menu item</Item>
    </SubMenu>
    <SubMenu title="disabled sub menu" disabled>
      <Item>5d menu item</Item>
      <Item>6th menu item</Item>
    </SubMenu>
  </Menu>
);

export const Default = () => {
  const { show, contextHolder } = useConfirm();
  const [radioValue, setRadioValue] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [delayLoading, setDelayLoading] = useState(false);
  const [customLoading, setCustomLoading] = useState(false);
  const message = useMessage({
    className: 'test'
  })

  const errorMessage = useErrorMessage({
    className: 'test2'
  })

  const notification = useNotification({
    className: 'test2',
    type: 'error',
    title: "ERROR"
  })

  const handleShowMessage = (type: MessageType) => {
    console.log('SHOW MESSAGE');

    message.show({
      type: type,
      content: 'This is a message bro!',
    })
  }

  const showModal = () => {
    setModalVisible(true);
  };

  const handleModalOk = () => {
    setModalVisible(false);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleRadioChange = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value)
  }

  const FooterModal = () => {
    return (
      <div>
        <Button
          type="primary"
          label="Ok"
        />
        <Button
          type="ghosted"
          label="Batal"
        />
      </div>
    );
  }

  const IconClose = () => {
    return (
      <Icon
        name="X"
      />
    );
  }

  return (
    <div>
      <h1 className="text-xl text-primary-1 mb-10">Tooltip Component without Props Defined</h1>
      <div style={{ marginBottom: 20 }}>
        <Tooltip
          title="Hello World"
          placement="top"
        >
          <Button label="Tooltip" />
        </Tooltip>
      </div>
      <div style={{ marginBottom: 20 }}>
        <Image
          width={200}
          height={200}
          src="error"
          fallback="data:image/png;base64,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"
        />
      </div>
      <div style={{ marginBottom: 20 }}>
        <Badge count={1}>
          <Avatar type="square" size="lg" />
        </Badge>
      </div>
      <div style={{ marginBottom: 20 }}>
        <Space direction="vertical" size="middle">
          <InputText placeholder="Basic Usage" />
          <InputText
            type="text"
            addonBefore="Large"
            placeholder="Large"
            size="large"
          />
          <InputText
            type="text"
            addonAfter="Medium"
            placeholder="Medium"
            size="medium"
          />
          <InputText
            type="text"
            addonBefore="("
            addonAfter=")"
            placeholder="Small"
            size="small"
          />
          <InputText type="textarea" placeholder="Text Area" />
          <InputText type="search" placeholder="Search" />
          <InputText type="password" placeholder="Password" />
          <label>
            {`AutoComplete : `}
            <AutoComplete
              options={options}
              placeholder="try to type b"
              filterOption={(inputValue, option) => {
                return (new RegExp(`^${inputValue}`, 'i')).test(option?.value)
              }}
            />
          </label>
        </Space>
      </div>
      <div style={{ marginBottom: 20 }}>
        <Space direction="vertical" size="middle">
          <h5>Basic</h5>
          <div className="ant-row">
            <div className="ant-col-1">
              <InputNumber defaultValue={0} style={{ width: 200 }} />
            </div>
          </div>
          <h5>Size</h5>
          <div className="row">
            <div className="col-2">
              <InputNumber
                size="large"
                placeholder="large"
                className="w-100"
              />
            </div>
            <div className="col-2">
              <InputNumber
                size="medium"
                placeholder="Medium"
                className="w-100"
              />
            </div>
            <div className="col-2">
              <InputNumber
                size="small"
                placeholder="Small"
                className="w-100"
              />
            </div>
          </div>
          <h5>Addon</h5>
          <div className="row">
            <div className="col-2">
              <InputNumber
                size="large"
                type="currency"
                placeholder="addonBefore"
                addonBefore="Rp"
                className="w-100"
              />
            </div>
            <div className="col-2">
              <InputNumber
                size="large"
                placeholder="addonAfter"
                addonAfter="Kg"
                className="w-100"
              />
            </div>
            <div className="col-4">
              <InputNumber
                size="large"
                type="currency"
                placeholder="addonAfter"
                addonBefore="+"
                addonAfter="$"
                className="w-100"
              />
            </div>
          </div>
          <h5>Currency</h5>
          <div className="ant-row">
            <div className="col-2">
              <InputNumber
                value={120000}
                disabled
                type="currency"
                addonBefore="$"
                size="large"
                className="w-100"
              />
            </div>
          </div>
        </Space>
      </div>
      <div style={{ marginBottom: 20 }}>
        <Carousel arrows={true} autoplay dotPosition="bottom">
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>
      </div>
      <div style={{ marginBottom: 20 }}>
        <Space direction="vertical" size="middle">
          <Alert
            message="Success Tips"
            description="Detailed description and advice about successful copywriting."
            type="success"
          />
          <Alert
            message="Informational Notes"
            description="Additional description and information about copywriting."
            type="info"
          />
          <Alert
            message="Warning"
            description="This is a warning notice about copywriting."
            type="warning"
            closable
          />
          <Alert
            message="Error"
            description="This is an error message about copywriting."
            type="error"
          />
        </Space>
      </div>
      <div style={{ marginBottom: 20 }}>
        <Space size="middle">
          <DatePicker />
          <DatePicker picker="week" />
          <DatePicker picker="month" />
          <DatePicker picker="quarter" />
          <DatePicker picker="year" />
        </Space>
      </div>
      <div style={{ marginBottom: 20 }}>
        <Space size="middle">
          <Button onClick={() => show({
            content: 'TEST'
          })} label="Confirm Modal"/>
          {contextHolder}

          <Button
            type="ghosted"
            label="Modal"
            size="md"
            onClick={() => showModal()}
          />
        </Space>

        <Modal
          closeIcon={<IconClose />}
          footer={<FooterModal />}
          visible={modalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          title="Modal Deo"
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
            Et tellus arcu, egestas ornare aliquam neque scelerisque cursus augue.
            Erat pharetra sapien ut elementum velit.Et tellus arcu,
            egestas ornare aliquam neque scelerisque cursus augue.
            Erat pharetra sapien ut elementum velit.
          </p>
        </Modal>
      </div>
      <div style={{ marginBottom: 20 }}>
        <GMap GOOGLE_MAP_KEY={"AIzaSyBduHLGyoBiSF_GrY33Q_LMwXZMV5kIPjQ"} initialValue={[
          {
            lat: -6.935238739306908,
            lng: 107.62132729668893,
          }
        ]}/>
      </div>
      <div style={{ marginBottom: 20 }}>
        <h4>Breadcrumb</h4>
        <Breadcrumb items={items}/>
      </div>
      <div style={{ marginBottom: 20 }}>
        <h4>Pagination</h4>
        <Pagination pageSize={10} total={30} totalSelected={3}/>
      </div>
      <div style={{ marginBottom: 20 }}>
        <Space size="middle">
          <Dropdown overlay={menu} placement="bottomLeft" arrow trigger={['click', 'hover']}>
            <Button label="bottomLeft" type="ghosted" />
          </Dropdown>
          <Dropdown overlay={menu} placement="bottomCenter" arrow trigger={['click']}>
            <Button label="bottomCenter" type="ghosted" />
          </Dropdown>
          <Dropdown overlay={menu} placement="bottomRight" arrow trigger={['click']}>
            <Button label="bottomRight" type="ghosted" />
          </Dropdown>
          <Dropdown overlay={menu} placement="topLeft" arrow trigger={['click']}>
            <Button label="topLeft" type="ghosted" />
          </Dropdown>
          <Dropdown overlay={menu} placement="topCenter" arrow trigger={['click']}>
            <Button label="topCenter" type="ghosted" />
          </Dropdown>
          <Dropdown overlay={menu} placement="topRight" arrow trigger={['click']}>
            <Button label="topRight" type="ghosted" />
          </Dropdown>
        </Space>
      </div>
      <div style={{ marginBottom: 20 }}>
        <div className="row">
          <div className="col-12">
            <h4>Basic Usage</h4>
            <Spinner />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h4>Size</h4>
            <Space size="middle">
              <Spinner size="small" />
              <Spinner />
              <Spinner size="large" />
            </Space>
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <div
              className="w-100 d-flex align-items-center justify-content-center"
              style={{ height: 100, border: "1px solid black" }}
            >
              <Spinner />
            </div>
          </div>
        </div>

        <Spinner spinning={loading}>
          <Card
            title="Basic Embedded"
          >
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem maiores voluptatem</p>
          </Card>
        </Spinner>
        <div className="mt-2 d-flex align-items-center">
          <span className="ml-1">Loading State :</span>
          <Switch
            onChange={(value) => setLoading(value)}
            className="ml-2"
          />
        </div>

        <Spinner spinning={delayLoading} delay={500}>
          <Card
            title="Delay Loading"
          >
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem maiores voluptatem</p>
          </Card>
        </Spinner>
        <div className="mt-2 d-flex align-items-center">
          <span className="ml-1">Loading State :</span>
          <Switch
            onChange={(value) => setDelayLoading(value)}
            className="ml-2"
          />
        </div>

        <Spinner spinning={customLoading} tip="Loading...">
          <Card
            title="Customize Loading"
          >
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem maiores voluptatem</p>
          </Card>
        </Spinner>
        <div className="mt-2 d-flex align-items-center">
          <span className="ml-1">Loading State :</span>
          <Switch
            onChange={(value) => setCustomLoading(value)}
            className="ml-2"
          />
        </div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <h4>useMessage</h4>
        <Button type="ghosted" label="Success" onClick={() => handleShowMessage('success')} />
        <Button type="ghosted" label="Info" onClick={() => handleShowMessage('info')} />
        <Button type="ghosted" label="Warning" onClick={() => handleShowMessage('warning')} />
        <Button type="ghosted" label="Error" onClick={() => handleShowMessage('error')} />
        <Button type="ghosted" label="Loading" onClick={() => handleShowMessage('loading')} />
      </div>
      <div style={{ marginBottom: 20 }}>
        <h4>useErrorMessage</h4>
        <Button type="ghosted" label="Error Messages" onClick={() => errorMessage.show(errors)} />
      </div>
      <div style={{ marginBottom: 20 }}>
        <h4>useNotification</h4>
        <Button type="ghosted" label="Notification Messages" onClick={() => notification.show({ response: { data: errors }})} />
      </div>
      <div style={{ marginBottom: 20 }}>
        <h4>Radio</h4>
        <Radio.Group onChange={handleRadioChange} value={radioValue}>
          <Radio
            value={1}
          >{radioValue === 1 ? 'Active' : 'Inactive'}
          </Radio>

          <Radio
            value={2}
          >{radioValue === 2 ? 'Active' : 'Inactive'}
          </Radio>
        </Radio.Group>

        <Radio disabled>
          Disabled
        </Radio>

        <Radio
          defaultChecked
          disabled>
          Disabled
        </Radio>
      </div>
      <div style={{ marginBottom: 20 }}>
        <h4>TimePicker</h4>
        <TimePicker />
      </div>
      <div style={{ marginBottom: 20 }}>
        <h4>Stepper</h4>
        <Stepper value={0} min={-5} max={5} />
      </div>
    </div>
  )
};
