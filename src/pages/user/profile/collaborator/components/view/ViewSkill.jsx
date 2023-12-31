import { Box, Divider, Flex, Icon, Tag, TagLabel, useDisclosure, useMediaQuery } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Box2Fill, Pencil, PlusLg } from 'react-bootstrap-icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import '../../collaborator.css';
import { getInformation } from '../../../../../../api/getInformation';
import TopicInfoModal from '../../../../../../components/modal/topicInformationModal/TopicInfoModal';

const ViewSkill = ({ userSkill, ownerUsername }) => {
    // eslint-disable-next-line
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const previousLocation = 'Profile';
    const user = useSelector((state) => state.user.value);
    const { isOpen: isTopicInfo, onOpen: openTopicInfo, onClose: closeTopicInfo } = useDisclosure();
    const [infoFetching, setInfoFetching] = useState(false);
    const [infoFetched, setInfoFetched] = useState(false);
    const [infoData, setInfoData] = useState("");

    const handleGetInformation = async (topic) => {
        setInfoFetching(true);
        openTopicInfo();

        const infromation = await getInformation(topic);

        setInfoFetched(true);
        setInfoData(infromation.data)
        setInfoFetching(false);
    }

    const mannualCloseInfoTopic = () => {
        setInfoFetched(false);
        closeTopicInfo();
    }

    return (
        <>
            <TopicInfoModal props={{
                isOpen: isTopicInfo,
                onOpen: openTopicInfo,
                onClose: mannualCloseInfoTopic,
                infoFetching,
                infoFetched,
                infoData
            }} />

            <Box mt={4} px={4} py={2} boxShadow='xs' borderRadius={4}>
                <Flex alignItems='center' justifyContent='space-between'>
                    <Flex alignItems='center' gap={2}>
                        <Icon as={Box2Fill} />
                        <Box>Skill</Box>
                    </Flex>

                    {user.globalUsername === ownerUsername &&
                        <Flex
                            as={Link}
                            to='/user/editcollaborator'
                            state={{ pageType: "skillDetails", previousLocation }}
                            alignItems='center'
                        >
                            <Icon as={userSkill.length !== 0 ? Pencil : PlusLg} />
                        </Flex>
                    }
                </Flex>

                <Divider className='container-divider' />

                {userSkill.length !== 0 ? <>
                    <Box>
                        {userSkill.map((item, index) => (
                            <Tag
                                size='lg'
                                key={index}
                                borderRadius='full'
                                variant='solid'
                                className='tag'
                                onClick={() => handleGetInformation(item)}
                            >
                                <TagLabel>{item}</TagLabel>
                            </Tag>
                        ))}
                    </Box>
                </> : <>
                    <Box textAlign='center' py={4}>
                        No skill information available
                    </Box>
                </>}

            </Box>
        </>
    )
}

export default ViewSkill
