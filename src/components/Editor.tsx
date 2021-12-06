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
import {FaBars, FaMoon, FaSun} from "react-icons/all";
import {Tooltip} from "@mui/material";
import Moment from "react-moment";
import moment from "moment";

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

    const [dateModified, setDateModified] = useState("")
    useEffect(() => {
        if(props.note.id) {
            editorRef.current!.setContent(props.note.text)
        }

        var toggle = document.getElementById("theme-toggle");

        var storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        if (storedTheme)
            document.documentElement.setAttribute('data-theme', storedTheme)


        // @ts-ignore
        toggle.onclick = function() {
            var currentTheme = document.documentElement.getAttribute("data-theme");
            var targetTheme = "light";

            if (currentTheme === "light") {
                targetTheme = "dark";
            }

            document.documentElement.setAttribute('data-theme', targetTheme)
            localStorage.setItem('theme', targetTheme);
        };

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
        <div className={"prose_ "}>
            <AllStyledComponent>
                <ThemeProvider>
                    <Remirror
                        manager={manager}
                        initialContent={state}
                        autoRender='end'
                        // hooks={hooks}
                        onChange={
                            (parameter) => {
                                // if (props.note.id) {
                                //     clearTimeout(timer);
                                //     timer = setTimeout(() => {
                                        saveToBackend(props.note.id, parameter)
                                setDateModified(moment().format("YYYY-MM-DD HH:mm:ss"))
                                //     }, 2000);
                                // }

                            }}
                    >
                        <div className={"h-14 px-4 flex justify-start items-center editor-header "}>
                            <div>
                                <Tooltip title={"Toggle menu"}>
                                    <button onClick={props.toggleSidebar}>
                                        <FaBars/>
                                    </button>
                                </Tooltip>
                            </div>
                            <div className={"noprint ml-4"}>
                                {props.note.id
                                ? <Toolbar items={toolbarItems} refocusEditor label="Top Toolbar"/>
                                    : null}
                            </div>
                            <div className={"pt-1 ml-auto"}>
                                <button id="theme-toggle" className="" type="button">
                                    <span className="d-block-light d-none hover:text-hover-accent"><FaMoon/></span>
                                    <span className="d-block-dark d-none hover:text-hover-accent"><FaSun/></span>
                                </button>
                            </div>
                        </div>
                        <div className={"editor-main"}>
                            <div className={"flex justify-center items-center"}>
                                <div className={"editor-date text-sm text-more-muted pt-2"}>
                                    {props.note.id
                                    ? <Moment date={dateModified} format={"D MMMM YYYY [at] HH:mm"}/>
                                        :null}
                                </div>
                            </div>
                            {props.note.id
                                ? <ImperativeHandle ref={editorRef}/>
                                : ""
                            }
                        </div>
                    </Remirror>
                </ThemeProvider>
            </AllStyledComponent>
        </div>
    );
};

export default ReplaceContentImperative;
