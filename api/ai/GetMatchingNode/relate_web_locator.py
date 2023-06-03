import torch as torch
from sentence_transformers import SentenceTransformer


def get_closest_node(node_list, vec, nodes_vec):
    dists = torch.norm(nodes_vec - vec, dim=1)
    lst = sorted(enumerate(dists.cpu().numpy()), key=lambda x: x[1])  # sort by distance
    return node_list[lst[0][0]]  # return the top node name


def get_matching_node(nodes, description):
    model = SentenceTransformer('all-MiniLM-L6-v2')  # load the sentence transformer model

    nodes_embeddings = model.encode(nodes, convert_to_tensor=True)
    description_embedding = model.encode(description, convert_to_tensor=True)

    result_node = get_closest_node(nodes, description_embedding, nodes_embeddings)
    print("Description: " + description)
    print("Node prediction: " + result_node)
    return result_node