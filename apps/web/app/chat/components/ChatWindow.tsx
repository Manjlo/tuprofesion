"use client";

import { useState } from "react";
import styles from "../chat.module.css";
import { Input, Button, Avatar, Upload, Image } from "antd";
import {
  SendOutlined,
  UserOutlined,
  PaperClipOutlined,
  CheckOutlined,
} from "@ant-design/icons";

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "text",
      content: "Hello!",
      sender: "other",
      status: "read",
    },
    {
      id: 2,
      type: "text",
      content: "Hi there!",
      sender: "me",
      status: "read",
    },
    {
      id: 3,
      type: "text",
      content: "How are you?",
      sender: "other",
      status: "read",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now(),
          type: "text",
          content: inputValue,
          sender: "me",
          status: "sent",
        },
      ]);
      setInputValue("");
    }
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setMessages([
        ...messages,
        {
          id: Date.now(),
          type: "image",
          content: reader.result as string,
          sender: "me",
          status: "sent",
        },
      ]);
    };
    reader.readAsDataURL(file);
    return false; // Prevent antd from uploading the file
  };

  const renderMessageContent = (message: any) => {
    if (message.type === "image") {
      return <Image src={message.content} alt="Uploaded" width={200} />;
    }
    return message.content;
  };

  const renderReadReceipt = (status: string) => {
    if (status === "read") {
      return <CheckOutlined style={{ color: "var(--accent-color)" }} />;
    }
    if (status === "delivered") {
      return <CheckOutlined />;
    }
    return null;
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <Avatar size="large" icon={<UserOutlined />} />
        <div className={styles.chatHeaderText}>
          <h3>Chat with User</h3>
          <p>Online</p>
        </div>
      </div>
      <div className={styles.chatBody}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${
              message.sender === "me" ? styles.myMessage : styles.otherMessage
            }`}
          >
            {renderMessageContent(message)}
            {message.sender === "me" && (
              <div className={styles.readReceipt}>
                {renderReadReceipt(message.status)}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={styles.chatFooter}>
        <Upload
          beforeUpload={handleImageUpload}
          showUploadList={false}
          accept="image/*"
        >
          <Button icon={<PaperClipOutlined />} className={styles.uploadButton} />
        </Upload>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleSendMessage}
          placeholder="Type a message..."
          className={styles.input}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSendMessage}
          className={styles.sendButton}
        />
      </div>
    </div>
  );
}
