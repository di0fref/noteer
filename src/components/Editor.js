import React, {useCallback, useEffect} from 'react';
import {
    BoldExtension,
    MarkdownExtension,
    ItalicExtension,
    TableExtension,
    BulletListExtension,
    OrderedListExtension
} from 'remirror/extensions';
import {Remirror, useHelpers, useKeymap, useRemirror, useRemirrorContext} from '@remirror/react';

// // Hooks can be added to the context without the need for creating custom components
const hooks = [
    () => {
        const {getJSON} = useHelpers();

        const handleSaveShortcut = useCallback(
            ({state}) => {
                console.log(`Save to backend: ${JSON.stringify(getJSON(state))}`);

                return true; // Prevents any further key handlers from being run.
            },
            [getJSON],
        );

        // "Mod" means platform agnostic modifier key - i.e. Ctrl on Windows, or Cmd on MacOS
        useKeymap('Mod-s', handleSaveShortcut);
    },
];


function Editor({content}){

    useEffect(() => {
        manager.view.updateState(manager.createState({ content: content }));
    }, [content])

    const { manager, state, onChange } = useRemirror({
        extensions: () => [
                new BoldExtension(),
                new MarkdownExtension(),
                new ItalicExtension(),
                new OrderedListExtension(),
                new BulletListExtension()
            ],
            content: content,
            stringHandler: "markdown"
    });

    return (
        <Remirror
            manager={manager}
            state={state}
            onChange={onChange}
            hooks={hooks}
            autoRender='end'
        />
    );
};

export default Editor