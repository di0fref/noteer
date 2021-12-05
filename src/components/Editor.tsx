import {forwardRef, Ref, useEffect, useImperativeHandle, useRef, useCallback, useState} from 'react';
import {
    Remirror,
    ThemeProvider,
    useRemirror,
    useRemirrorContext,
    useHelpers,
    useKeymap,
    ComponentItem,
    Toolbar
} from '@remirror/react';
import {
    BoldExtension,
    ItalicExtension,
    BulletListExtension,
    OrderedListExtension,
    UnderlineExtension,
    HeadingExtension
} from 'remirror/extensions';
import NotesService from "../service/NotesService";
import {prosemirrorNodeToHtml} from 'remirror';
import {AllStyledComponent} from "@remirror/styles/emotion";
import type {ToolbarItemUnion} from "@remirror/react";
import tocbot from "tocbot";

export interface EditorRef {
    setContent: (content: any) => void;
}

const saveToBackend = (id: string, state: any) => {
    NotesService.saveText(id, {
        text: prosemirrorNodeToHtml(state.state.doc)
    }).then((result) => {
    }).catch((err) => {
        console.log(err);
    });

}
const toolbarItems: ToolbarItemUnion[] = [
    {
        type: ComponentItem.ToolbarGroup,
        label: "History",
        items: [
            {type: ComponentItem.ToolbarCommandButton, commandName: "undo", display: "icon"},
            {type: ComponentItem.ToolbarCommandButton, commandName: "redo", display: "icon"},
        ],
        separator: "end",
    },
    {
        type: ComponentItem.ToolbarGroup,
        label: "Simple Formatting",
        items: [
            {type: ComponentItem.ToolbarCommandButton, commandName: "toggleBold", display: "icon"},
            {type: ComponentItem.ToolbarCommandButton, commandName: "toggleItalic", display: "icon"},
            {type: ComponentItem.ToolbarCommandButton, commandName: "toggleUnderline", display: "icon"},
        ],
        separator: "end",
    },
    {
        type: ComponentItem.ToolbarGroup,
        label: "Heading Formatting",
        items: [
            {
                type: ComponentItem.ToolbarCommandButton,
                commandName: "toggleHeading",
                display: "icon",
                attrs: {level: 1},
            },
            {
                type: ComponentItem.ToolbarCommandButton,
                commandName: "toggleHeading",
                display: "icon",
                attrs: {level: 2},
            },
            {
                type: ComponentItem.ToolbarCommandButton,
                commandName: "toggleHeading",
                display: "icon",
                attrs: {level: 3},
            },
        ],
        separator: "none",
    },
    {
        type: ComponentItem.ToolbarMenu,
        label: "Headings",
        items: [
            {
                type: ComponentItem.MenuGroup,
                role: "radio",
                items: [
                    {
                        type: ComponentItem.MenuCommandPane,
                        commandName: "toggleHeading",
                        attrs: {level: 1},
                    },
                    {
                        type: ComponentItem.MenuCommandPane,
                        commandName: "toggleHeading",
                        attrs: {level: 2},
                    },
                    {
                        type: ComponentItem.MenuCommandPane,
                        commandName: "toggleHeading",
                        attrs: {level: 3},
                    },
                    {
                        type: ComponentItem.MenuCommandPane,
                        commandName: "toggleHeading",
                        attrs: {level: 4},
                    },
                    {
                        type: ComponentItem.MenuCommandPane,
                        commandName: "toggleHeading",
                        attrs: {level: 5},
                    },
                    {
                        type: ComponentItem.MenuCommandPane,
                        commandName: "toggleHeading",
                        attrs: {level: 6},
                    },
                ],
            },
        ],
    },
];
// const hooks = [
//     () => {
//         const {getJSON} = useHelpers();
//         const onSave = useCallback(
//             (props) => {
//                 const {state} = props;
//                 saveToBackend(JSON.stringify(getJSON(state)));
//                 // console.log(`Save to backend: ${JSON.stringify(getJSON(state))}`);
//
//                 return true;
//             },
//             [getJSON],
//         );
//
//         // "Mod" means platform agnostic modifier key - i.e. Ctrl on Windows, or Cmd on MacOS
//         useKeymap('Mod-s', onSave);
//     }
// ];
const ImperativeHandle = forwardRef((_: unknown, ref: Ref<EditorRef>) => {
    const {setContent} = useRemirrorContext({
        autoUpdate: true,
    });

    // Expose content handling to outside
    useImperativeHandle(ref, () => ({setContent}));

    return <></>;
});
const ReplaceContentImperative = (props: any): JSX.Element => {

    useEffect(() => {
        editorRef.current!.setContent(props.note.text)

        // let doc = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"));
        // doc.forEach(function (element, index) {
        //     element.id = "doc-id" + index;
        // })
        //
        // tocbot.init({
        //     tocSelector: '.js-toc',
        //     contentSelector: '.remirror-editor-wrapper',
        //     headingSelector: 'h1, h2, h3, h4, h5, h6',
        // })

    }, [props.note])

    const editorRef = useRef<EditorRef | null>(null);
    const {manager, state, setState} = useRemirror({
        extensions: () => [
            new HeadingExtension(),
            new BoldExtension({}),
            new ItalicExtension(),
            new UnderlineExtension(),
            new OrderedListExtension(),
            new BulletListExtension()
        ],
        content: '',
        stringHandler: 'html',
    });
    let timer = setTimeout(() => {
    }, 100);

    return (
        <div className={"prose"}>
            <AllStyledComponent>
                <ThemeProvider>
                    <Remirror
                        manager={manager}
                        initialContent={state}
                        autoRender='end'
                        // hooks={hooks}
                        onChange={
                            (parameter) => {
                                if (props.note.id) {
                                    clearTimeout(timer);
                                    timer = setTimeout(() => {
                                        saveToBackend(props.note.id, parameter)
                                    }, 2000);
                                }
                            }}
                    >
                        <div className={"noprint"}>
                            <Toolbar items={toolbarItems} refocusEditor label="Top Toolbar"/>
                        </div>
                        <ImperativeHandle ref={editorRef}/>
                    </Remirror>
                </ThemeProvider>
            </AllStyledComponent>
        </div>
    );
};

export default ReplaceContentImperative;
