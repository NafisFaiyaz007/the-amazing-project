import React from 'react';
import { Table, Button, Tooltip } from 'antd';
import moment from 'moment';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Last Modified Date',
    dataIndex: 'modifiedTime',
    key: 'modifiedTime',
    render: (text) => <span>{moment(text).format('Do MMM YYYY HH:mm A')}</span>,
  },
  {
    title: 'Action',
    key: 'status',
    dataIndex: 'status',
    render: (_, tag, l ="https://drive.google.com/file/d/") => (
      <span>
        <Tooltip title="Download Document">
          <script language= "javascript" type='text/javascript'> var id = {tag.id}</script>
        <a href = {"https://drive.google.com/uc?export=download&id="+tag.id} >
          <Button type="primary" ghost >
            Download 
          </Button>
          </a>
        </Tooltip>      
      </span>
    ),
  },
];
const DriveList = (documents=[]) => {

        return(
        <div>          
            <Table
            className="table-striped-rows"
            rowKey={(r) => r.id}
            columns={columns}
            dataSource={documents.documents}
            pagination={{ simple: true }}            
            />
        </div>
    );
}
export default DriveList;