import React, { useState, useEffect, useRef } from 'react'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'

export default function MyEditor(h) {
    const [editor, setEditor] = useState(null) // 存储 editor 实例
    const [html, setHtml] = useState('')

    // 模拟 ajax 请求，异步设置 html
    useEffect(() => {
        console.log('h====', h, editor)
        setTimeout(() => {
            setHtml(h.cont)
            editor.dangerouslyInsertHtml(h.cont)
        }, 500)
    }, [h.cont])

    const toolbarConfig = {}
    const editorConfig = {
        placeholder: '请输入内容...',
    }

    // 及时销毁 editor
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    const onChange = (editor) => {
        setHtml(editor.getHtml())
        h?.wangChange && h.wangChange(editor.getHtml())
    }

    return (
        <div style={{ border: '1px solid #ccc', zIndex: 100, margin: '15px 0', width: '800px' }}>
            <Toolbar
                editor={editor}
                defaultConfig={toolbarConfig}
                mode="default"
                style={{ borderBottom: '1px solid #ccc' }}
            />
            <Editor
                defaultConfig={editorConfig}
                value={html}
                onCreated={setEditor}
                onChange={onChange}
                mode="default"
                style={{ height: '500px' }}
            />
        </div>
    )
}

