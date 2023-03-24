import logging

import azure.functions as func
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
    return result_node

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    nodes = req.params.get('nodes')
    description = req.params.get('description')
    if not nodes:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            nodes = req_body.get('nodes')
            description = req_body.get('description')

    if nodes and description:
        return get_matching_node(nodes, description)
    else:
        return func.HttpResponse(
             "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.",
             status_code=200
        )
