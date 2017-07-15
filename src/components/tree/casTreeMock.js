export default{
    modelData : {
        id: 'Root',
        attr: {type: 'course'},
        children: [
            {
                id: 'Math',
                text: 'Math',
                attr: {
                    type: 'course'
                },
                children: [
                    {
                        id: 'Algebra',
                        text: 'Algebra',
                        attr: {
                            type: 'mod'
                        }
                    },
                    {
                        id: 'LinearAlgebra',
                        text: 'Linear Algebra',
                        attr: {
                            type: 'mod'
                        }
                    },
                    {
                        id: 'Geometry',
                        text: 'Geometry',
                        attr: {
                            type: 'mod'
                        }
                    }
                ]
                
            },
            {
                id: 'Language',
                text: 'Language',
                attr: {
                    type: 'course'
                },
                children: [
                    {
                        id: 'Grammer',
                        text: 'Grammer',
                        attr: {
                            type: 'mod'
                        }
                    },
                    {
                        id: 'Literature',
                        text: 'Literature',
                        attr: {
                            type: 'mod'
                        }
                    },
                    {
                        id: 'CriticalThinking',
                        text: 'Critical Thinking',
                        attr: {
                            type: 'mod'
                        }
                    }
                ]
                
            },
            {
                id: 'Science',
                text: 'Science',
                attr: {
                    type: 'course'
                },
                children: [
                    {
                        id: 'PhysicalScience',
                        text: 'Physical Science',
                        attr: {
                            type: 'mod'
                        }
                    },
                    {
                        id: 'Biology',
                        text: 'Biology',
                        attr: {
                            type: 'mod'
                        }
                    },
                    {
                        id: 'Physics',
                        text: 'Physics',
                        attr: {
                            type: 'mod'
                        }
                    }
                ]
                
            }
        ]

    }
}

