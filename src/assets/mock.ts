import { IFile } from '@/types/file';
import { IGroup } from '@/types/group';
import { IPollWithOwner } from '@/types/poll';
import { IUser } from '@/types/user';

export const polls: IPollWithOwner[] = [
    {
        id: 'a01fde6b-492d-46ec-bf14-4f9b86c41a31',
        ownerId: 'dd5cb6dc-d2c4-4421-8de2-1e51369c3f51',
        title: 'Climate Change Opinions',
        documentUrl:
            'https://docs.google.com/document/d/1N6VRI3nXKUV3bL9-V8RJ6FcdQdCbVDUZcH6rGRfJjSc/edit?usp=sharing',
        deadline: new Date('2023-12-31'),
        state: 'active',
        resultUrl: 'https://r-randimg-py.fly.dev/picsum/doc2',
        votedFor: 200,
        votedAgainst: 100,
        votersCount: 3000,
        owner: {
            id: 'e5e17f91-0095-4d86-99be-76e78dac502d',
            name: 'Environmental Group',
            logo: 'https://r-randimg-py.fly.dev/picsum/climate',
        },
    },
    {
        id: 'e5b51dfb-6e40-4e9d-9682-fb40c5aba59f',
        ownerId: 'e5e17f91-0095-4d86-99be-76e78dac502d',
        title: 'Future of Remote Work',
        documentUrl: 'https://r-randimg-py.fly.dev/picsum/doc2',
        deadline: new Date('2024-01-31'),
        state: 'frozen',
        votedFor: 30,
        votedAgainst: 1000,
        votersCount: 1030,
        owner: {
            id: 'e5e17f91-0095-4d86-99be-76e78dac502d',
            name: 'Tech Company',
            logo: 'https://r-randimg-py.fly.dev/picsum/logo2',
        },
    },
    {
        id: '48a39106-4197-49a8-a8d8-6837d0f23f6e',
        ownerId: 'e5e17f91-0095-4d86-99be-76e78dac502d',
        title: 'Public Transport Usage',
        documentUrl: 'https://r-randimg-py.fly.dev/picsum/doc3',
        deadline: new Date('2024-02-28'),
        state: 'active',
        resultUrl: 'https://r-randimg-py.fly.dev/picsum/result3',
        votedFor: 2000,
        votedAgainst: 100,
        votersCount: 3000,
        owner: {
            id: 'e5e17f91-0095-4d86-99be-76e78dac502d',
            name: 'City Council',
            logo: 'https://r-randimg-py.fly.dev/picsum/logo3',
        },
    },
    {
        id: 'b703d073-f15f-4d88-befe-16b68086b6ef',
        ownerId: 'e5e17f91-0095-4d86-99be-76e78dac502d',
        title: 'Online Learning Effectiveness',
        documentUrl: 'https://r-randimg-py.fly.dev/picsum/doc4',
        deadline: new Date('2024-03-31'),
        state: 'frozen',
        resultUrl: 'https://r-randimg-py.fly.dev/picsum/result4',
        votedFor: 200,
        votedAgainst: 160,
        votersCount: 500,
        owner: {
            id: 'e5e17f91-0095-4d86-99be-76e78dac502d',
            name: 'Education Department',
            logo: 'https://r-randimg-py.fly.dev/picsum/logo4',
        },
    },
    {
        id: 'ac027289-382e-49f8-9f65-b8b4af9388e5',
        ownerId: 'e5e17f91-0095-4d86-99be-76e78dac502d',
        title: 'Lorem Ipsum',
        documentUrl: 'https://r-randimg-py.fly.dev/picsum/doc5',
        deadline: new Date('2024-03-28'),
        state: 'frozen',
        resultUrl: 'https://r-randimg-py.fly.dev/picsum/result5',
        votedFor: 2000,
        votedAgainst: 400,
        votersCount: 2700,
        owner: {
            id: 'e5e17f91-0095-4d86-99be-76e78dac502d',
            name: 'City Council',
            logo: 'https://r-randimg-py.fly.dev/picsum/logo3',
        },
    },
    {
        id: '06cb3516-3d97-4515-80a3-53527847d9bf',
        ownerId: 'e5e17f91-0095-4d86-99be-76e78dac502d',
        title: 'Online Lorem Ipsum',
        documentUrl: 'https://r-randimg-py.fly.dev/picsum/doc6',
        deadline: new Date('2024-03-28'),
        state: 'active',
        resultUrl: 'https://r-randimg-py.fly.dev/picsum/result6',
        votedFor: 1200,
        votedAgainst: 670,
        votersCount: 2100,
        owner: {
            id: 'e5e17f91-0095-4d86-99be-76e78dac502d',
            name: 'City Council',
            logo: 'https://r-randimg-py.fly.dev/picsum/logo6',
        },
    },
] as const;

export const users: IUser[] = [
    {
        id: 'e5e17f91-0095-4d86-99be-76e78dac502d',
        username: 'envGroup',
        firstname: 'Environmental',
        lastname: 'Group',
        password: 'password123',
        image: 'https://r-randimg-py.fly.dev/picsum/climate',
    },
    {
        id: 'dd5cb6dc-d2c4-4421-8de2-1e51369c3f51',
        username: 'techCompany',
        firstname: 'Tech',
        lastname: 'Company',
        password: 'password123',
        image: 'https://r-randimg-py.fly.dev/picsum/logo2',
    },
    {
        id: '48a39106-4197-49a8-a8d8-6837d0f23f6e',
        username: 'cityCouncil',
        firstname: 'City',
        lastname: 'Council',
        password: 'password123',
        image: 'https://r-randimg-py.fly.dev/picsum/logo3',
    },
] as const;

export const groups: IGroup[] = [
    {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Group of users that love_java_like_names',
        logo: 'https://r-randimg-py.fly.dev/picsum/group1',
    },
    {
        id: '987e6543-e21b-12d3-a456-426614174000',
        name: 'Group 2',
        logo: 'https://r-randimg-py.fly.dev/picsum/group2',
    },
    {
        id: '456e7891-e32b-12d3-a456-426614174000',
        name: 'Group 3',
        logo: 'https://r-randimg-py.fly.dev/picsum/group3',
    },
] as const;

export const files: IFile[] = [
    {
        id: '123e4567-e89b-12d3-a456-426614174000',
        createdBy: 'e5e17f91-0095-4d86-99be-76e78dac502d',
        createdAt: new Date('2022-01-01'),
        name: 'Environmental Report 2022',
    },
    {
        id: '987e6543-e21b-12d3-a456-426614174000',
        createdBy: 'dd5cb6dc-d2c4-4421-8de2-1e51369c3f51',
        createdAt: new Date('2022-02-01'),
        name: 'Tech Company Financial Statement 2022',
    },
    {
        id: '456e7891-e32b-12d3-a456-426614174000',
        createdBy: '48a39106-4197-49a8-a8d8-6837d0f23f6e',
        createdAt: new Date('2022-03-01'),
        name: 'City Council Meeting Minutes March 2022',
    },
    {
        id: '789e1234-e56b-12d3-a456-426614174000',
        createdBy: 'e5e17f91-0095-4d86-99be-76e78dac502d',
        createdAt: new Date('2022-04-01'),
        name: 'Environmental Impact Assessment April 2022',
    },
    {
        id: '321e9876-e65b-12d3-a456-426614174000',
        createdBy: 'dd5cb6dc-d2c4-4421-8de2-1e51369c3f51',
        createdAt: new Date('2022-05-01'),
        name: 'Tech Company Product Roadmap 2022',
    },
] as const;
